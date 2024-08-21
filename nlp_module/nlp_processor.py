from transformers import pipeline

class NLPProcessor:
    def __init__(self):
        # Initialize the NLP pipeline
        self.nlp = pipeline("question-answering")

    def process_input(self, question, context):
        # Process the input and return the response
        result = self.nlp(question=question, context=context)
        return result['answer']
