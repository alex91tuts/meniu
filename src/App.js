import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import BottomMenu from './components/BottomMenu';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Menu from './pages/Menu';
import Shopping from './pages/Shopping';
import Settings from './pages/Settings';
import { FaSun, FaMoon } from 'react-icons/fa';

function AppContent() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm py-4 px-6 mb-6 flex justify-between items-center`}>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>Meniu</h1>
          <button onClick={toggleTheme} className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </header>
        <main className="container mx-auto px-4 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <BottomMenu />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
