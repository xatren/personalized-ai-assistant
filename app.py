from flask import Flask, request, jsonify
from nlp_module.nlp_processor import NLPProcessor

app = Flask(__name__)
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

    answer = nlp_processor.process_input(question, context, user_id)
    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(debug=True)
