import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { GiCookingPot, GiCarrot, GiMortarPestle, GiEgg, GiCheeseWedge, GiBreadSlice, GiFishCooked, GiDrumstick } from 'react-icons/gi';

const RecipeForm = ({ recipe, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    ingredients: [],
    instructions: [],
    mealType: ''
  });

  useEffect(() => {
    if (recipe) {
      setFormData(recipe);
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prevData => ({
      ...prevData,
      ingredients: newIngredients
    }));
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData(prevData => ({
      ...prevData,
      instructions: newInstructions
    }));
  };

  const addIngredient = () => {
    setFormData(prevData => ({
      ...prevData,
      ingredients: [...prevData.ingredients, '']
    }));
  };

  const addInstruction = () => {
    setFormData(prevData => ({
      ...prevData,
      instructions: [...prevData.instructions, '']
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const getIngredientIcon = (ingredient) => {
    const lowerIngredient = ingredient.toLowerCase();
    if (lowerIngredient.includes('vegetable') || lowerIngredient.includes('carrot')) return GiCarrot;
    if (lowerIngredient.includes('spice') || lowerIngredient.includes('herb')) return GiMortarPestle;
    if (lowerIngredient.includes('egg')) return GiEgg;
    if (lowerIngredient.includes('cheese') || lowerIngredient.includes('dairy')) return GiCheeseWedge;
    if (lowerIngredient.includes('bread') || lowerIngredient.includes('flour')) return GiBreadSlice;
    if (lowerIngredient.includes('fish')) return GiFishCooked;
    if (lowerIngredient.includes('meat') || lowerIngredient.includes('chicken')) return GiDrumstick;
    return GiCookingPot; // Default icon
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows="3"
        ></textarea>
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ingredients</label>
        {formData.ingredients.map((ingredient, index) => {
          const IngredientIcon = getIngredientIcon(ingredient);
          return (
            <div key={index} className="flex items-center mb-2">
              <IngredientIcon className="mr-2 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          );
        })}
        <button type="button" onClick={addIngredient} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 flex items-center">
          <FaPlus className="mr-2" /> Add Ingredient
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Instructions</label>
        {formData.instructions.map((instruction, index) => (
          <div key={index} className="flex items-start mb-2">
            <span className="mr-2 mt-1 text-gray-500 dark:text-gray-400">{index + 1}.</span>
            <textarea
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows="2"
            ></textarea>
          </div>
        ))}
        <button type="button" onClick={addInstruction} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center">
          <FaPlus className="mr-2" /> Add Instruction
        </button>
      </div>
      <div>
        <label htmlFor="mealType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Meal Type</label>
        <select
          id="mealType"
          name="mealType"
          value={formData.mealType}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">Select a meal type</option>
          <option value="Mic dejun">Mic dejun</option>
          <option value="Pranz">Pranz</option>
          <option value="Cina">Cina</option>
        </select>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 flex items-center">
            <FaTrash className="mr-2" /> Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center">
            <FaEdit className="mr-2" /> Save Recipe
          </button>
        </div>
        {recipe && (
          <button type="button" onClick={() => onDelete(recipe.id)} className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center">
            <FaTrash className="mr-2" /> Delete Recipe
          </button>
        )}
      </div>
    </form>
  );
};

export default RecipeForm;
