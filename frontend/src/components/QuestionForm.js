import React, { useState } from 'react';
import Spinner from '../Spinner';

function QuestionForm({ onSubmit, theme, fontSize, themes, loading }) {
  const [question, setQuestion] = useState('');
  const [searchIn, setSearchIn] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sources, setSources] = useState('');
  const [domains, setDomains] = useState('');
  const [excludeDomains, setExcludeDomains] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      question,
      searchIn,
      fromDate,
      toDate,
      sources,
      domains,
      excludeDomains,
    };
    onSubmit(searchParams);
    setQuestion('');
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

      {/* Gelişmiş Arama Seçenekleri */}
      <div>
        <label className={`block ${themes[theme].text} text-sm font-bold mb-2`}>Search In</label>
        <select
          value={searchIn}
          onChange={(e) => setSearchIn(e.target.value)}
          className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${themes[theme].text} dark:bg-gray-700 ${fontSize}`}
        >
          <option value="">All Fields</option>
          <option value="title">Title</option>
          <option value="description">Description</option>
          <option value="content">Content</option>
        </select>
      </div>

      <div>
        <label className={`block ${themes[theme].text} text-sm font-bold mb-2`}>From Date</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${themes[theme].text} dark:bg-gray-700 ${fontSize}`}
        />
      </div>

      <div>
        <label className={`block ${themes[theme].text} text-sm font-bold mb-2`}>To Date</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${themes[theme].text} dark:bg-gray-700 ${fontSize}`}
        />
      </div>

      <div>
        <label className={`block ${themes[theme].text} text-sm font-bold mb-2`}>Sources</label>
        <input
          type="text"
          value={sources}
          onChange={(e) => setSources(e.target.value)}
          className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${themes[theme].text} dark:bg-gray-700 ${fontSize}`}
          placeholder="bbc-news, the-verge"
        />
      </div>

      <div>
        <label className={`block ${themes[theme].text} text-sm font-bold mb-2`}>Domains</label>
        <input
          type="text"
          value={domains}
          onChange={(e) => setDomains(e.target.value)}
          className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${themes[theme].text} dark:bg-gray-700 ${fontSize}`}
          placeholder="bbc.co.uk, techcrunch.com"
        />
      </div>

      <div>
        <label className={`block ${themes[theme].text} text-sm font-bold mb-2`}>Exclude Domains</label>
        <input
          type="text"
          value={excludeDomains}
          onChange={(e) => setExcludeDomains(e.target.value)}
          className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 ${themes[theme].text} dark:bg-gray-700 ${fontSize}`}
          placeholder="example.com, example.org"
        />
      </div>

      <button
        type="submit"
        className={`w-full ${themes[theme].button} font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${fontSize}`}
        disabled={loading}
      >
        {loading ? <Spinner /> : 'Search'}
      </button>
    </form>
  );
}

export default QuestionForm;
