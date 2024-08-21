from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

class NLPProcessor:
    def __init__(self):
        # Initialize the NLP pipeline
        self.qa_pipeline = pipeline("question-answering")
        self.intents = ['get_weather', 'set_reminder', 'ask_question']
        self.vectorizer = TfidfVectorizer()
        self.classifier = LogisticRegression()

        # Train a simple intent recognition model (mock training data)
        training_data = [
            "What is the weather like today?",
            "Set a reminder for tomorrow at 10 AM",
            "Who is the president of the United States?",
        ]
        training_labels = ['get_weather', 'set_reminder', 'ask_question']
        X_train = self.vectorizer.fit_transform(training_data)
        self.classifier.fit(X_train, training_labels)

    def recognize_intent(self, user_input):
        X_test = self.vectorizer.transform([user_input])
        return self.classifier.predict(X_test)[0]

    def process_input(self, question, context):
        intent = self.recognize_intent(question)
        
        if intent == 'ask_question':
            result = self.qa_pipeline(question=question, context=context)
            return result['answer']
        elif intent == 'get_weather':
            return "Fetching weather data..."
        elif intent == 'set_reminder':
            return "Setting reminder..."
        else:
            return "Sorry, I didn't understand that."
