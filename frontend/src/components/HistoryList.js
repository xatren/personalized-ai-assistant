// src/components/HistoryList.js
import React from 'react';

function HistoryList({ history, theme, fontSize, clearHistory, themes }) {
  return (
    <div className={`mt-8 p-4 rounded-lg shadow-md ${themes[theme].background}`}>
      <h3 className={`text-xl font-bold mb-4 ${themes[theme].text}`}>History</h3>
      <ul className="space-y-4">
        {history.map((item, index) => (
          <li key={index} className={`bg-white dark:bg-gray-700 p-4 rounded-lg shadow ${fontSize}`}>
            <p className={`text-sm ${themes[theme].text}`}><strong>Q:</strong> {item.question}</p>
            <p className={`text-sm ${themes[theme].text}`}><strong>A:</strong> {item.response}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={clearHistory}
        className={`mt-4 w-full bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${fontSize}`}
      >
        Clear History
      </button>
    </div>
  );
}

export default HistoryList;
