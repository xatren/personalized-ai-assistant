# Personalized AI Assistant

The **Personalized AI Assistant** is a Flask-based application designed to provide users with various functionalities, including weather information, news headlines, and stock market data. It utilizes NLP (Natural Language Processing) to interpret user queries and fetch relevant information through integrated APIs.

## Features

- **Weather Information**: Get current weather data for a specified city using the OpenWeatherMap API.
- **News Headlines**: Fetch the latest news headlines on various topics using the News API.
- **Stock Market Data**: Retrieve real-time stock prices for specific stock symbols using the Alpha Vantage API.
- **NLP-Based Intent Recognition**: Interpret and respond to user queries using an NLP pipeline.

## Project Structure

```
personalized-ai-assistant/
│
├── app.py                  # Main Flask application file
├── config.py               # Configuration file for storing API keys and settings
├── requirements.txt        # Python dependencies required for the project
│
├── nlp_module/             # NLP-related modules and logic
│   ├── __init__.py
│   └── nlp_processor.py    # NLPProcessor class handling various intents
│
├── weather.py              # Weather API integration logic
├── news.py                 # News API integration logic
├── stock.py                # Stock Market API integration logic
│
└── .env                    # Environment file to securely store API keys (not included in version control)
```

## Installation

### Prerequisites

- Python 3.7 or higher
- Flask
- An account with API keys for:
  - [OpenWeatherMap API](https://openweathermap.org/api)
  - [News API](https://newsapi.org/)
  - [Alpha Vantage API](https://www.alphavantage.co/support/#api-key)

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/xatren/personalized-ai-assistant.git
   cd personalized-ai-assistant
   ```

2. **Create a virtual environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows use `venv\Scripts\activate`
   ```

3. **Install the required dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure the environment variables**:

   Create a `.env` file in the root directory and add your API keys:

   ```bash
   OPENWEATHER_API_KEY=your_openweather_api_key_here
   NEWS_API_KEY=your_news_api_key_here
   STOCK_API_KEY=your_stock_api_key_here
   ```

5. **Run the application**:

   ```bash
   python app.py
   ```

   The application will start running on `http://127.0.0.1:5000/`.

## Usage

### Endpoints

- **GET /**: Returns a welcome message.
- **POST /ask**: Main endpoint to interact with the AI assistant. You need to send a JSON payload with a `question`, `context`, and optional `user_id`.

### Example Request

```json
{
  "user_id": "user_020",
  "question": "What's the weather in Berlin?",
  "context": ""
}
```

### Example Response

```json
{
  "answer": "The weather in Berlin is currently clear sky with a temperature of 18°C."
}
```

### Available Queries

- **Weather Queries**: "What's the weather in [City]?"
- **News Queries**: "What's the latest news on [Topic]?"
- **Stock Market Queries**: "What's the current price of [Stock Symbol]?"

## Troubleshooting

- **API Key Errors**: Ensure that all API keys are correctly set in the `.env` file.
- **IndexError**: Ensure the external APIs return valid data. If the stock market is closed or the API limits are reached, data might be unavailable.

## Contributing

Contributions are welcome! Please fork this repository and submit pull requests to contribute.

## License

This project is licensed under the MIT License.
