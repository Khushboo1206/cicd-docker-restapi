from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)

# CORS fix for React
CORS(app, resources={r"/*": {"origins": "*"}})

# MongoDB connection (works for local + docker)
mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(mongo_uri)

db = client["taskdb"]
collection = db["tasks"]

# Home route
@app.route("/")
def home():
    return "🚀 DevTask Pro Backend Running"

# ===============================
# GET all tasks
# ===============================
@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = list(collection.find({}, {"_id": 0}))
    return jsonify(tasks)

# ===============================
# ADD new task
# ===============================
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    title = data.get("title")

    if not title:
        return jsonify({"error": "Title required"}), 400

    collection.insert_one({"title": title})
    return jsonify({"message": "Task added successfully"})

# ===============================
# DELETE task
# ===============================
@app.route("/tasks/<title>", methods=["DELETE"])
def delete_task(title):
    collection.delete_one({"title": title})
    return jsonify({"message": "Task deleted"})

# ===============================
# DELETE ALL (for testing)
# ===============================
@app.route("/delete-all", methods=["DELETE"])
def delete_all():
    collection.delete_many({})
    return jsonify({"message": "All tasks deleted"})

# ===============================
# Run server
# ===============================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
