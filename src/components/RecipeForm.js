import React, { useState, useEffect } from 'react';

const RecipeForm = ({ recipe, onSave, onCancel }) => {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ingredients</label>
        {formData.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        ))}
        <button type="button" onClick={addIngredient} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Ingredient</button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instructions</label>
        {formData.instructions.map((instruction, index) => (
          <textarea
            key={index}
            value={instruction}
            onChange={(e) => handleInstructionChange(index, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows="2"
          ></textarea>
        ))}
        <button type="button" onClick={addInstruction} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Instruction</button>
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
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save Recipe</button>
      </div>
    </form>
  );
};

export default RecipeForm;
