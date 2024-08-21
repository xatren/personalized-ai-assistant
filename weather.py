import requests
from config import WEATHER_API_KEY

api_key = WEATHER_API_KEY
def get_weather(city, api_key):
    if not city:
        print("City is not provided.")
        return None

    base_url = "http://api.openweathermap.org/data/2.5/weather"
    params = {
        'q': city,
        'appid': api_key,
        'units': 'metric'  # Use 'imperial' for Fahrenheit
    }
    
    # Debugging: Print the full URL to ensure it's correct
    print(f"Requesting weather data for: {city}")
    print(f"Full URL: {base_url}?q={city}&appid={api_key}&units=metric")

    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        weather_data = response.json()
        return weather_data
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None
