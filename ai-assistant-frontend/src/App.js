import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HistoryList from './components/HistoryList';
import QuestionForm from './components/QuestionForm';
import { themes } from './utils/themes';
import { loadFromLocalStorage, saveToLocalStorage } from './utils/localStorageHelpers';

function App() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [userId, setUserId] = useState(loadFromLocalStorage('userId', `user_${Date.now()}`));
  const [theme, setTheme] = useState(loadFromLocalStorage('theme', 'light'));
  const [fontSize, setFontSize] = useState(loadFromLocalStorage('fontSize', 'text-base'));

  useEffect(() => {
    const storedHistory = loadFromLocalStorage('history', []);
    setHistory(storedHistory);

    saveToLocalStorage('userId', userId);
  }, [userId]);

  useEffect(() => {
    saveToLocalStorage('theme', theme);
    saveToLocalStorage('fontSize', fontSize);
  }, [theme, fontSize]);

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('history');
  };

  const handleSubmit = async (question) => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, context: '', user_id: userId }),
      });

      const data = await res.json();
      setResponse(data.answer);
      const updatedHistory = [{ question, response: data.answer }, ...history];
      setHistory(updatedHistory);
      saveToLocalStorage('history', updatedHistory);
    } catch (error) {
      setResponse('An error occurred while fetching the response.');
    } finally {
      setLoading(false); // Ensure loading is set to false in both success and failure scenarios
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${themes[theme].background}`}>
      <div className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md`}>
        <Header theme={theme} setTheme={setTheme} fontSize={fontSize} setFontSize={setFontSize} themes={themes} />
        <QuestionForm onSubmit={handleSubmit} theme={theme} fontSize={fontSize} themes={themes} loading={loading} />
        {response && (
          <div className={`mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow ${fontSize}`}>
            <h2 className={`text-lg font-bold ${themes[theme].text}`}>Response:</h2>
            <p className={themes[theme].text}>{response}</p>
          </div>
        )}
        {history.length > 0 && (
          <HistoryList history={history} theme={theme} fontSize={fontSize} clearHistory={handleClearHistory} themes={themes} />
        )}
      </div>
    </div>
  );
}

export default App;
