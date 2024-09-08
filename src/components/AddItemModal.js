import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
  const [newItem, setNewItem] = useState({ ingredient: '', quantity: '', quantityType: 'grams', category: 'Other' });

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.ingredient && newItem.quantity) {
      onAddItem(newItem);
      setNewItem({ ingredient: '', quantity: '', quantityType: 'grams', category: 'Other' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Adaugă un nou produs</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Produs</label>
            <input
              type="text"
              id="ingredient"
              name="ingredient"
              value={newItem.ingredient}
              onChange={handleNewItemChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cantitate</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={newItem.quantity}
                onChange={handleNewItemChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="quantityType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Unitate</label>
              <select
                id="quantityType"
                name="quantityType"
                value={newItem.quantityType}
                onChange={handleNewItemChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="grams">grame</option>
                <option value="piece">bucăți</option>
                <option value="ml">ml</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Categorie</label>
            <select
              id="category"
              name="category"
              value={newItem.category}
              onChange={handleNewItemChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="Other">Altele</option>
              <option value="Produce">Fructe și Legume</option>
              <option value="Dairy">Lactate</option>
              <option value="Meat">Carne</option>
              <option value="Grains">Cereale</option>
              <option value="Canned Goods">Conserve</option>
              <option value="Spices">Condimente</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Anulează
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
            >
              <FaPlus className="mr-2" /> Adaugă
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
