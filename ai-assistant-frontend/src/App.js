import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);  // State for history
  const [darkMode, setDarkMode] = useState(false);  // State for dark mode

  // Load dark mode and history settings from localStorage when the component mounts
  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode);
    }

    const storedHistory = JSON.parse(localStorage.getItem('history'));
    if (storedHistory) {
      setHistory(storedHistory);
    }
  }, []);

  // Apply dark mode based on state and save the setting to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, context: '' }),
      });

      const data = await res.json();
      setResponse(data.answer);

      // Update the history with the new question and response
      setHistory([{ question, response: data.answer }, ...history]);
    } catch (error) {
      setResponse('An error occurred while fetching the response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">AI Assistant</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="focus:outline-none"
          >
            {darkMode ? (
              <span className="text-yellow-300">🌞</span>
            ) : (
              <span className="text-gray-700">🌙</span>
            )}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Ask a Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              placeholder="What's the weather in Berlin?"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Ask'}
          </button>
        </form>
        {response && (
          <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">Response:</h2>
            <p className="text-gray-600 dark:text-gray-400">{response}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">History</h3>
            <ul className="space-y-4">
              {history.map((item, index) => (
                <li key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-500 dark:text-gray-400"><strong>Q:</strong> {item.question}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300"><strong>A:</strong> {item.response}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
