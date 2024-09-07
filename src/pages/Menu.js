import React from 'react';

const Menu = () => {
  const weekMenu = [
    { id: 1, day: 'Monday', meal: 'Spaghetti Carbonara' },
    { id: 2, day: 'Tuesday', meal: 'Chicken Stir Fry' },
    { id: 3, day: 'Wednesday', meal: 'Greek Salad' },
    { id: 4, day: 'Thursday', meal: 'Beef Tacos' },
    { id: 5, day: 'Friday', meal: 'Vegetable Curry' },
    { id: 6, day: 'Saturday', meal: 'Grilled Salmon' },
    { id: 7, day: 'Sunday', meal: 'Roast Chicken' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      <div className="masonry">
        {weekMenu.map((item) => (
          <div key={item.id} className="pin p-4">
            <h2 className="text-xl font-semibold mb-2">{item.day}</h2>
            <p>{item.meal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
