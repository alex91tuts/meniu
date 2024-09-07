import React from 'react';

const Shopping = () => {
  const shoppingList = [
    { id: 1, category: 'Produce', items: ['Tomatoes', 'Lettuce', 'Cucumbers', 'Bell Peppers'] },
    { id: 2, category: 'Dairy', items: ['Milk', 'Cheese', 'Yogurt'] },
    { id: 3, category: 'Meat', items: ['Chicken Breast', 'Ground Beef', 'Salmon'] },
    { id: 4, category: 'Grains', items: ['Rice', 'Pasta', 'Bread'] },
    { id: 5, category: 'Canned Goods', items: ['Beans', 'Tomato Sauce', 'Corn'] },
    { id: 6, category: 'Spices', items: ['Salt', 'Pepper', 'Cumin', 'Paprika'] },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Shopping List</h1>
      <div className="masonry">
        {shoppingList.map((category) => (
          <div key={category.id} className="pin p-4">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">{category.category}</h2>
            <ul className="list-disc list-inside dark:text-gray-300">
              {category.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shopping;
