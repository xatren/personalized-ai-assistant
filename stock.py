import requests
from config import STOCK_API_KEY

def get_stock_price(symbol):
    base_url = "https://www.alphavantage.co/query"
    params = {
        'function': 'TIME_SERIES_INTRADAY',
        'symbol': symbol,
        'interval': '5min',
        'apikey': STOCK_API_KEY
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()  # Raises an HTTPError for bad responses
        data = response.json()

        # Check if the expected data is present
        if 'Time Series (5min)' not in data:
            print(f"Error: 'Time Series (5min)' data not found for {symbol}.")
            return None

        time_series = data['Time Series (5min)']

        if not time_series:
            print(f"Error: Time Series data is empty for {symbol}.")
            return None

        # Safely get the latest timestamp
        latest_timestamp = sorted(time_series.keys())[0]
        latest_data = time_series[latest_timestamp]

        return {
            "symbol": symbol,
            "price": latest_data['1. open'],  # Opening price for the latest interval
            "timestamp": latest_timestamp
        }

    except requests.exceptions.RequestException as e:
        print(f"Error making API request: {e}")
        return None
    except (KeyError, IndexError) as e:
        print(f"Error parsing response data: {e}")
        return None
