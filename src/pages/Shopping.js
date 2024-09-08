import React, { useState, useEffect } from 'react';
import { getMenuItemsWithProfiles } from '../utils/db';
import { generateShoppingList } from '../utils/shoppingListGenerator';
import { FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';

const Shopping = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [pantryItems, setPantryItems] = useState([]);
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
      prevList.map(category => {
        if (category.id === categoryId) {
          const newItems = [...category.items];
          newItems[itemIndex] = { ...newItems[itemIndex], checked: !newItems[itemIndex].checked };
          // Move checked items to the end
          newItems.sort((a, b) => a.checked === b.checked ? 0 : a.checked ? 1 : -1);
          return { ...category, items: newItems };
        }
        return category;
      })
    );
  };

  const moveItemToPantry = (categoryId, itemIndex) => {
    setShoppingList(prevList => {
      const newList = prevList.map(category => {
        if (category.id === categoryId) {
          const newItems = [...category.items];
          const [movedItem] = newItems.splice(itemIndex, 1);
          return { ...category, items: newItems };
        }
        return category;
      });
      setPantryItems(prev => [...prev, { ...shoppingList.find(c => c.id === categoryId).items[itemIndex], category: shoppingList.find(c => c.id === categoryId).category }]);
      return newList;
    });
  };

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 dark:text-white">Shopping List</h1>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-1 sm:p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          >
            <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
          </button>
          <span className="text-sm sm:text-base font-medium dark:text-white">{formatDateRange(startDate)}</span>
          <button
            onClick={() => navigateWeek(1)}
            className="p-1 sm:p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          >
            <FaChevronRight className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shoppingList.map((category) => (
          <div key={category.id} className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 dark:text-white">{category.category}</h2>
            <ul className="space-y-1 sm:space-y-2">
              {category.items.map((item, index) => (
                <li key={index} className="flex items-center space-x-2 text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItemCheck(category.id, index)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className={`flex-grow dark:text-gray-300 ${item.checked ? 'line-through' : ''}`}>
                    {`${item.ingredient}: ${item.quantity} ${item.quantityType}`}
                  </span>
                  <button
                    onClick={() => moveItemToPantry(category.id, index)}
                    className="px-2 py-1 rounded bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300 text-xs"
                  >
                    Cămară
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {pantryItems.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Cămară</h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              {pantryItems.map((item, index) => (
                <li key={index} className="flex items-center space-x-2 text-xs sm:text-sm">
                  <span className="dark:text-gray-300">
                    {`${item.ingredient}: ${item.quantity} ${item.quantityType} (${item.category})`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shopping;
