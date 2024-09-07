import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const themes = {
  light: {
    background: '#f3f4f6',
    secondary: '#ffffff',
    accent: '#ef4444',
  },
  dark: {
    background: '#212121',
    secondary: '#272727',
    accent: '#ffc20d',
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(themes.light);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      setTheme(themes.dark);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      setTheme(themes.dark);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme(themes.light);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
