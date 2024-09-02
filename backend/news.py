import requests
from config import NEWS_API_KEY

class NewsAPIError(Exception):
    pass

def get_news(query, language='en', sort_by='publishedAt', page_size=10, cache_duration=600):
    base_url = "https://newsapi.org/v2/everything"
    params = {
        'q': query,
        'apiKey': NEWS_API_KEY,
        'language': language,
        'sortBy': sort_by,
        'pageSize': page_size
    }

    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()  # Raises an error for bad status codes
        news_data = response.json()
        
        if news_data.get('status') != 'ok':
            raise NewsAPIError(f"Error: {news_data.get('code')} - {news_data.get('message')}")

        articles = news_data.get('articles', [])
        headlines = [article['title'] for article in articles]
        return headlines

    except requests.exceptions.RequestException as e:
        raise NewsAPIError(f"Request failed: {str(e)}")

    except NewsAPIError as e:
        print(f"Error: {e}")
        return None
