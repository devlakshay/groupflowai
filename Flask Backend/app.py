# pip3 instal Flask sentence-transformers qdrant-client

from flask import Flask, request, jsonify
from flask_cors import CORS

from qdrant_client import models, QdrantClient
from sentence_transformers import SentenceTransformer

import time
import json


def current_milli_time():
    return round(time.time() * 1000)


app = Flask(__name__)
CORS(app)

encoder = SentenceTransformer("all-MiniLM-L6-v2")

# client = QdrantClient(url="http://localhost:6333")

client = QdrantClient(
    url="https://71f17288-a57d-4c3c-91d8-18c2a98f913d.europe-west3-0.gcp.cloud.qdrant.io:6333",
    api_key="4rbzTFpMszvULZNaUBMXo89FHDoqZdnxy2dNeypwF_YQPI7npgg1aA",
)


@app.route("/api/add-point", methods=["POST"])
def handle_data():

    # Check if content type is JSON

    if not request.is_json:
        return (
            jsonify({"error": "Request must have Content-Type: application/json"}),
            400,
        )

    # Get the JSON data
    data = request.get_json()

    # print(data)

    # Process the data (example: print it)
    print(f"Received JSON data: {data}")

    point = ""
    try:
        point = models.PointStruct(
            id=current_milli_time(),
            vector=encoder.encode(json.dumps(data)).tolist(),
            payload=data,
        )

        # print(point.vector)
    except Exception as e:
        print("point error", e)

    try:
        client.recreate_collection(
            collection_name="FLOW GROUP AI",
            vectors_config=models.VectorParams(
                size=len(point.vector),  # Vector size is defined by used model
                distance=models.Distance.COSINE,
            ),
        )

        response = client.upsert(
            collection_name="FLOW GROUP AI",
            points=[point],
        )

        print(response)
    except Exception as e:
        print("res error", e)
    # print(response)

    # Return a success response
    return jsonify({"message": "Data received successfully!"}), 201


if __name__ == "__main__":
    app.run()
