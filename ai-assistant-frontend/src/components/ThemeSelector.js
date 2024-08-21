// src/components/ThemeSelector.js
import React from 'react';

function ThemeSelector({ theme, setTheme, fontSize, setFontSize, themes }) {
  return (
    <div className="flex space-x-2">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className={`ml-2 p-2 rounded ${themes[theme].text} bg-white dark:bg-gray-800 border`}
      >
        {Object.keys(themes).map((key) => (
          <option key={key} value={key}>
            {themes[key].name}
          </option>
        ))}
      </select>
      <select
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value)}
        className={`ml-2 p-2 rounded ${themes[theme].text} bg-white dark:bg-gray-800 border`}
      >
        <option value="text-sm">Small</option>
        <option value="text-base">Medium</option>
        <option value="text-lg">Large</option>
        <option value="text-xl">Extra Large</option>
      </select>
    </div>
  );
}

export default ThemeSelector;
