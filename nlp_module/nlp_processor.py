from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from weather import get_weather
from config import WEATHER_API_KEY
import string
from news import get_news  # Import the news module


class NLPProcessor:
    def __init__(self):
        # Initialize the NLP pipeline
        self.qa_pipeline = pipeline("question-answering")
        self.intents = ['get_weather', 'set_reminder', 'ask_question', 'get_news', 'get_stock_price', 'manage_tasks']
        self.vectorizer = TfidfVectorizer()
        self.classifier = LogisticRegression()
        self.memory = {}

        # Training data for intent recognition
        training_data = [
            "What is the weather like today?",
            "Set a reminder for tomorrow at 10 AM",
            "Who is the president of the United States?",
            "What's the latest news?",
            "What's the stock price of Apple?",
            "Show me my tasks for today"
        ]
        training_labels = ['get_weather', 'set_reminder', 'ask_question', 'get_news', 'get_stock_price', 'manage_tasks']
        X_train = self.vectorizer.fit_transform(training_data)
        self.classifier.fit(X_train, training_labels)

    def update_memory(self, user_id, context):
        if user_id not in self.memory:
            self.memory[user_id] = []
        self.memory[user_id].append(context)

    def get_memory(self, user_id):
        return " ".join(self.memory.get(user_id, []))

    def recognize_intent(self, user_input):
        X_test = self.vectorizer.transform([user_input])
        return self.classifier.predict(X_test)[0]

    def get_weather(self, city):
        weather_data = get_weather(city, WEATHER_API_KEY)  # Pass the API key here
        if weather_data:
            description = weather_data['weather'][0]['description']
            temperature = weather_data['main']['temp']
            city_name = weather_data['name']
            return f"The weather in {city_name} is currently {description} with a temperature of {temperature} °C."
        else:
            return "Sorry, I couldn't fetch the weather data right now."
    def get_news(self, topic):
        headlines = get_news(topic)
        if headlines:
            return "Here are the latest news headlines:\n" + "\n".join(headlines)
        else:
            return "Sorry, I couldn't fetch the news right now."
        
    def process_input(self, question, context, user_id=None):
    # Update memory with the user's context if available
        if user_id:
            previous_context = self.get_memory(user_id)
            full_context = f"{previous_context} {context}"
            self.update_memory(user_id, context)
        else:
            full_context = context

        # Recognize the user's intent
        intent = self.recognize_intent(question)

        if intent == 'ask_question':
            # Process the question-answering intent
            result = self.qa_pipeline(question=question, context=full_context)
            return result['answer']

        elif intent == 'get_weather':
            # Extract the city from the question
            city = self.extract_city(question)

            if city is None:
                return "I'm sorry, I couldn't determine the city. Could you please specify it?"

            # Get the weather information for the extracted city
            return self.get_weather(city)
        elif intent == 'get_news':
            topic = self.extract_topic(question)  # You may need to create this method
            return self.get_news(topic)
        # Add more intent processing as needed for other intents
        # elif intent == 'set_reminder':
        #     # Handle reminder setting
        #     return self.set_reminder(question)

        # elif intent == 'get_news':
        #     # Handle fetching news
        #     topic = self.extract_topic(question)
        #     return self.get_news(topic)

        else:
            # Default fallback if the intent is not recognized
            return "I'm sorry, I didn't understand your request."




    def extract_city(self, question):
        # Expanded list of cities
        city_names = [
            "Paris", "London", "New York", "Tokyo", "Berlin", 
            "San Francisco", "Los Angeles", "Chicago", "Moscow",
            "Mumbai", "Sydney", "Shanghai", "Toronto", "Madrid", 
            "Rome", "Dubai", "Istanbul", "Beijing", "Hong Kong", 
            "Singapore", "Mexico City"
        ]

        words = question.split()

        for word in words:
            # Remove punctuation from the word
            word_cleaned = word.strip(string.punctuation)
            print(f"Checking word: {word_cleaned}")  # Debugging

            if word_cleaned.istitle() and word_cleaned in city_names:
                print(f"City found: {word_cleaned}")  # Debugging
                return word_cleaned
        
        print("City not found.")
        return None


    def extract_topic(self, question):
        # Simple heuristic to extract the topic from the question
        words = question.split()
        # Assume the first lowercase noun or noun phrase is the topic
        for word in words:
            if word.islower():
                return word
        return "general news"

    def recognize_intent(self, user_input):
        X_test = self.vectorizer.transform([user_input])
        intent = self.classifier.predict(X_test)[0]
        print(f"Recognized intent: {intent}")  # Debugging statement
        return intent


