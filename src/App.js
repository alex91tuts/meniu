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
  const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext);

  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
        <header className="shadow-sm py-4 px-6 mb-6 flex justify-between items-center" style={{ backgroundColor: theme.secondary }}>
          <h1 className="text-2xl font-bold" style={{ color: theme.accent }}>Meniu</h1>
          <button onClick={toggleTheme} className="p-2 rounded-full" style={{ backgroundColor: isDarkMode ? '#333' : '#e0e0e0', color: theme.accent }}>
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
