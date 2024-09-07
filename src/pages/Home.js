import React from 'react';

const Home = () => {
  const pins = [
    { id: 1, title: 'Welcome', content: 'Welcome to Meniu, your personal meal planner!' },
    { id: 2, title: 'Recipes', content: 'Discover new recipes and save your favorites.' },
    { id: 3, title: 'Menu Planning', content: 'Plan your meals for the week with ease.' },
    { id: 4, title: 'Shopping Lists', content: 'Generate shopping lists based on your meal plans.' },
    { id: 5, title: 'Customize', content: 'Tailor your meal plans to your dietary preferences.' },
    { id: 6, title: 'Save Time', content: 'Streamline your meal planning and shopping process.' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Home</h1>
      <div className="masonry">
        {pins.map((pin) => (
          <div key={pin.id} className="pin p-4">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">{pin.title}</h2>
            <p className="dark:text-gray-300">{pin.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
