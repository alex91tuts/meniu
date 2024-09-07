import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to My Tailwind React App</h1>
        <p className="text-gray-700 mb-4">This is a simple example to demonstrate Tailwind CSS integration.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click me!
        </button>
      </div>
    </div>
  );
}

export default App;
