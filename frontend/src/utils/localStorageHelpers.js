// src/utils/localStorageHelpers.js

export const loadFromLocalStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (e) {
      // If JSON.parse fails, return the raw stored value (for non-JSON strings)
      return storedValue || defaultValue;
    }
  };
  
  export const saveToLocalStorage = (key, value) => {
    // Only stringify if value is an object/array
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  };
  