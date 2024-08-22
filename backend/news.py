import requests
from config import NEWS_API_KEY

def get_news(query):
    base_url = "https://newsapi.org/v2/everything"
    params = {
        'q': query,
        'apiKey': NEWS_API_KEY,
        'language': 'en',
        'sortBy': 'publishedAt',
        'pageSize': 25  # Number of news articles to retrieve
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        news_data = response.json()
        articles = news_data.get('articles', [])
        headlines = [article['title'] for article in articles]
        return headlines
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None
