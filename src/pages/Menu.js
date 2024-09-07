import React from 'react';

const Menu = () => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

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
      <div className="flex justify-between mb-6 overflow-x-auto">
        {weekDays.map((day, index) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + index);
          const isCurrentDay = date.toDateString() === currentDate.toDateString();

          return (
            <div key={day} className="flex flex-col items-center mx-2">
              <span className="text-sm font-medium dark:text-gray-300">{day}</span>
              <span className="text-lg font-semibold dark:text-white">{date.getDate().toString().padStart(2, '0')}</span>
              {isCurrentDay && <div className="w-1 h-1 bg-red-500 rounded-full mt-1"></div>}
            </div>
          );
        })}
      </div>
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Menu</h1>
      <div className="masonry">
        {weekMenu.map((item) => (
          <div key={item.id} className="pin p-4">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">{item.day}</h2>
            <p className="dark:text-gray-300">{item.meal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
