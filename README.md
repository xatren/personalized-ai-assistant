# Personalized AI Assistant

A personalized AI assistant built using Python, Flask, and React, designed to maintain context across multiple interactions, provide real-time responses, and allow users to customize their interface. The assistant can answer questions, fetch weather data, provide news updates, retrieve stock prices, and more.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Customization](#customization)
- [API Integrations](#api-integrations)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Context Awareness**: The assistant retains context across multiple questions, enabling more natural conversations.
- **Customizable UI**: Users can switch themes, adjust font sizes, and personalize their interface.
- **API Integrations**: Fetches real-time data such as weather updates, news, and stock prices.
- **History Management**: Users can view their interaction history and clear it as needed.

## Project Structure

```
personalized-ai-assistant/
│
├── backend/
│   ├── app.py                # Main Flask application
│   ├── nlp_module/
│   │   ├── __init__.py       # Initializes the NLP module
│   │   └── nlp_processor.py  # Handles NLP tasks, context management, and API calls
│   │            
│   │           
│   │              
│   ├── config.py             # Configuration file for API keys and other settings
│   ├── stock.py              # Handles stock market API calls and processing
|   ├── weather.py            # Handles weather API calls and processing
|   └── news.py               # Handles news API calls and processing
|
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js        # Header component with theme and font size selectors
│   │   │   ├── HistoryList.js   # Displays the history of user interactions
│   │   │   └── QuestionForm.js  # Form to submit user questions
│   │   ├── utils/
│   │   │   ├── themes.js          # Theme configuration
│   │   │   └── localStorageHelpers.js  # Helper functions for localStorage operations
│   │   ├── App.js              # Main React component
│   │   ├── Spinner.js          # Loading spinner component
│   │   └── index.js            # Entry point for React
│   └── public/
│       ├── index.html          # Main HTML file
│       
│
├── README.md                   # Project documentation
├── requirements.txt            # Python dependencies
└── package.json                # Node.js dependencies

```

## Installation

### Backend (Python)
1. Clone the repository:
   ```bash
   git clone https://github.com/xatren/personalized-ai-assistant.git
   cd personalized-ai-assistant
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate   # On MacOs use `source venv/bin/activate`
   ```

3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend (React)
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the required Node.js packages:
   ```bash
   npm install
   ```

## Running the Application

### Start the Backend Server

Run the Flask server:
```bash
cd backend
python app.py
```

### Start the Frontend Server

Run the React development server:
```bash
cd frontend
npm start
```

### Access the Application

Open your browser and go to `http://localhost:3000` to use the AI Assistant.

## Usage

### Asking Questions

- Enter your question in the input box and click "Ask". The assistant will process the question and respond based on the context of the conversation.
  
### Viewing History

- The interaction history is displayed below the input form. You can view past questions and answers, which are stored for the session.

### Clearing History

- Click "Clear History" to remove all past interactions from the current session.

### Customizing the Interface

- Use the dropdowns in the header to change the theme (light, dark, blue) and adjust the font size (small, medium, large, extra large).

## Customization

### Adding New Intents

You can extend the `NLPProcessor` class to handle more types of questions and intents. Define new methods for processing these intents and update the `recognize_intent` method to detect them.

### API Integrations

The assistant integrates with various APIs (e.g., weather, news, stocks). You can add more APIs by defining new methods in `nlp_processor.py` and updating the frontend to utilize them.

### Context Management

The assistant maintains context using a dictionary keyed by `user_id`. You can extend this feature by adding more sophisticated context management strategies, such as using a database for persistent storage.

## Troubleshooting

### Connection Errors

Ensure both the backend and frontend servers are running. Check that the endpoints in the frontend match the correct backend URLs.

## Contributing

Contributions are welcome! Please fork the repository, create a new branch for your feature or bug fix, and submit a pull request.

### Steps to Contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Add new feature"
   ```
4. Push to your fork and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
