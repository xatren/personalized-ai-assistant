from dotenv import load_dotenv
import os

# environment variables from .env file
load_dotenv()

# Access the API key
WEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY')
NEWS_API_KEY = os.getenv('NEWS_API_KEY')
STOCK_API_KEY = os.getenv('STOCK_API_KEY')
