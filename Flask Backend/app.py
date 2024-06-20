from flask import Flask, request, jsonify
from flask_cors import CORS
from qdrant_client import models, QdrantClient
import openai

app = Flask(__name__)
CORS(app)

QDRANT_URL = "https://71f17288-a57d-4c3c-91d8-18c2a98f913d.europe-west3-0.gcp.cloud.qdrant.io:6333"  # LAKSHYA
QDRANT_API = "4rbzTFpMszvULZNaUBMXo89FHDoqZdnxy2dNeypwF_YQPI7npgg1aA"  # LAKSHYA
COLLECTION_NAME = "Cluster0"
client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API,
)

OPENAI_KEY = "sk-proj-JTJuiJ4PynVT8oBapwWNT3BlbkFJdbzrgvtnoMh8eRbcTgvR"  # YASH
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
