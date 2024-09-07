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
      <div className="min-h-screen bg-gray-100 pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/shopping" element={<Shopping />} />
        </Routes>
        <BottomMenu />
      </div>
    </Router>
  );
}

export default App;
