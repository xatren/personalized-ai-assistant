// src/components/QuestionForm.js
import React, { useState } from 'react';
import Spinner from '../Spinner';

function QuestionForm({ onSubmit, theme, fontSize, themes, loading }) { // Add loading prop
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(question);
    setQuestion(''); // Clear the question input after submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block ${themes[theme].text} text-sm font-bold mb-2`}>
          Ask a Question
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${themes[theme].text} dark:bg-gray-700 ${fontSize}`}
          placeholder="What's the weather in Berlin?"
          required
        />
      </div>
      <button
        type="submit"
        className={`w-full ${themes[theme].button} font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${fontSize}`}
        disabled={loading} // Disable button while loading
      >
        {loading ? <Spinner /> : 'Ask'} {/* Display spinner only when loading */}
      </button>
    </form>
  );
}

export default QuestionForm;
