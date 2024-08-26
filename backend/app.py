from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from nlp_module.nlp_processor import NLPProcessor

app = Flask(__name__)
CORS(app)  # Enable CORS
#gittest
# Initialize the NLPProcessor
nlp_processor = NLPProcessor()

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Enhanced Personalized AI Assistant!"})

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    question = data.get('question')
    context = data.get('context', "This is a placeholder context.")
    user_id = data.get('user_id')

    if not question:
        return jsonify({"error": "Question is required"}), 400

    # Process the input using NLPProcessor
    answer = nlp_processor.process_input(question, context, user_id)
    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(debug=True)
