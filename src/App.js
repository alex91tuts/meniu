import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BottomMenu from './components/BottomMenu';

// Placeholder components for each route
const Home = () => <div className="p-4">Home Page</div>;
const Search = () => <div className="p-4">Search Page</div>;
const Favorites = () => <div className="p-4">Favorites Page</div>;
const Profile = () => <div className="p-4">Profile Page</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <BottomMenu />
      </div>
    </Router>
  );
}

export default App;
