from flask import Flask, request, jsonify
import pymongo
import torch
from transformers import BertTokenizer, BertModel
import numpy as np
from scipy.spatial.distance import cosine
import os

app = Flask(__name__)

# MongoDB connection
uri = "mongodb://localhost:27017"
db_name = "test_db"
collection_name = "works"
client = pymongo.MongoClient(uri)
db = client[db_name]

# Load BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

def embed_text(text):
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=512)
    outputs = model(**inputs)
    embeddings = outputs.last_hidden_state.mean(dim=1).detach().numpy()
    return embeddings

def compute_similarity(uploaded_document, descriptions):
    doc_embedding = embed_text(uploaded_document)
    description_embeddings = [embed_text(desc) for desc in descriptions]
    similarity_scores = [1 - cosine(doc_embedding, desc_emb) for desc_emb in description_embeddings]
    return similarity_scores

@app.route('/process-file', methods=['POST'])
def process_file():
    if 'file' not in request.files or 'description' not in request.form:
        return jsonify({'success': False, 'message': 'Missing file or description'}), 400

    file = request.files['file']
    description = request.form['description']

    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    try:
        with open(file_path, 'r') as f:
            uploaded_document = f.read()

        descriptions = [doc['description'] for doc in db[collection_name].find()]
        similarity_scores = compute_similarity(uploaded_document, descriptions)
        
        return jsonify({'success': True, 'scores': similarity_scores}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)
    app.run(host='0.0.0.0', port=5000)
