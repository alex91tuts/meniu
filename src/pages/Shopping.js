import React, { useState, useEffect } from 'react';
import { getMenuItemsWithProfiles } from '../utils/db';
import { generateShoppingList } from '../utils/shoppingListGenerator';
import { FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';

const Shopping = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    loadShoppingList();
  }, [startDate]);

  const loadShoppingList = async () => {
    try {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
      const menuItems = await getMenuItemsWithProfiles(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
      const generatedList = generateShoppingList(menuItems);
      setShoppingList(generatedList);
    } catch (error) {
      console.error('Error loading shopping list:', error);
    }
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + direction * 7);
    setStartDate(newDate);
  };

  const formatDateRange = (start) => {
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };

  const toggleItemCheck = (categoryId, itemIndex) => {
    setShoppingList(prevList => 
      prevList.map(category => 
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item, index) => 
                index === itemIndex ? { ...item, checked: !item.checked } : item
              )
            }
          : category
      )
    );
  };

  const toggleItemInPantry = (categoryId, itemIndex) => {
    setShoppingList(prevList => 
      prevList.map(category => 
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item, index) => 
                index === itemIndex ? { ...item, inPantry: !item.inPantry } : item
              )
            }
          : category
      )
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Shopping List</h1>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          >
            <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
          </button>
          <span className="text-lg font-medium dark:text-white">{formatDateRange(startDate)}</span>
          <button
            onClick={() => navigateWeek(1)}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          >
            <FaChevronRight className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shoppingList.map((category) => (
          <div key={category.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">{category.category}</h2>
            <ul className="space-y-2">
              {category.items.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItemCheck(category.id, index)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className={`flex-grow dark:text-gray-300 ${item.checked ? 'line-through' : ''}`}>
                    {`${item.ingredient}: ${item.quantity} ${item.quantityType}`}
                  </span>
                  <button
                    onClick={() => toggleItemInPantry(category.id, index)}
                    className={`px-2 py-1 rounded ${
                      item.inPantry
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {item.inPantry ? <FaCheck /> : 'In Pantry'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shopping;
