import React, { useState, useEffect } from 'react';
import { getMenuItemsWithProfiles } from '../utils/db';
import { generateShoppingList } from '../utils/shoppingListGenerator';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Shopping = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  useEffect(() => {
    loadShoppingList();
  }, [startDate, numberOfPeople]);

  const loadShoppingList = async () => {
    try {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
      const menuItems = await getMenuItemsWithProfiles(startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
      const generatedList = generateShoppingList(menuItems, numberOfPeople);
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

  return (
    <div>
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
        <div>
          <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Number of People</label>
          <input
            type="number"
            id="numberOfPeople"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shoppingList.map((category) => (
          <div key={category.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">{category.category}</h2>
            <ul className="list-disc list-inside dark:text-gray-300">
              {category.items.map((item, index) => (
                <li key={index}>{`${item.ingredient}: ${item.quantity} ${item.quantityType}`}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shopping;
