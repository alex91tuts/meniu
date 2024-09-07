import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BottomMenu from './components/BottomMenu';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Menu from './pages/Menu';
import Shopping from './pages/Shopping';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm py-4 px-6 mb-6">
          <h1 className="text-2xl font-bold text-red-500">Meniu</h1>
        </header>
        <main className="container mx-auto px-4 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/shopping" element={<Shopping />} />
          </Routes>
        </main>
        <BottomMenu />
      </div>
    </Router>
  );
}

export default App;
