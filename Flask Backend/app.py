from flask import Flask, request, jsonify
from flask_cors import CORS
from qdrant_client import models, QdrantClient
from dotenv import load_dotenv
import openai
import os

app = Flask(__name__)
load_dotenv()
CORS(app)

api_key = os.getenv("Lakshay_Qdrant_API")
url_qdrant = os.getenv("Lakshay_Qdrant_URL")
openai_key = os.getenv("Yash_OpenAI_API") # Edit this for your own API Keys.

QDRANT_URL = url_qdrant  # LAKSHYA
QDRANT_API = api_key  # LAKSHYA
COLLECTION_NAME = "Cluster0"
client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API,
)

OPENAI_KEY = openai_key  # YASH
openai.api_key = OPENAI_KEY


# ROUTES
@app.route("/api/add-point", methods=["POST"])
def handle_data():

    if not request.is_json:
        return (
            jsonify({"error": "Request must have Content-Type: application/json"}),
            400,
        )

    data = request.get_json()

    vector = (
        openai.embeddings.create(input=data["content"], model="text-embedding-ada-002")
        .data[0]
        .embedding
    )

    point = ""

    try:
        point = models.PointStruct(
            id=1,
            vector=vector,
            payload=data,
        )

    except Exception as e:
        print("point error", e)

    try:
        client.recreate_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=models.VectorParams(
                size=len(point.vector),
                distance=models.Distance.COSINE,
            ),
        )

        response = client.upsert(
            collection_name=COLLECTION_NAME,
            points=[point],
        )

        print(response)
    except Exception as e:
        print("res error", e)

    return jsonify({"message": "Data received successfully!"}), 201


@app.route("/api/retrieve-point", methods=["GET"])
def get_data():
    res = ""
    try:
        res = client.retrieve(
            collection_name=COLLECTION_NAME,
            ids=[1],
        )
    except Exception as e:
        print("Retrieve error", e)

    return res[0].payload["content"], 200


if __name__ == "__main__":
    app.run()
