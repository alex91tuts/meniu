import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { Switch } from '@headlessui/react';

const RecipeForm = ({ recipe, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    ingredients: [{ ingredient: '', quantity: '', quantityType: 'grams' }],
    instructions: [],
    mealType: ''
  });
  const [showIngredients, setShowIngredients] = useState(true);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({
          ...prevData,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
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
      ingredients: [...prevData.ingredients, { ingredient: '', quantity: '', quantityType: 'grams' }]
    }));
  };

  const deleteIngredient = (index) => {
    setFormData(prevData => ({
      ...prevData,
      ingredients: prevData.ingredients.filter((_, i) => i !== index)
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
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 w-full">
      {formData.image && (
        <div className="w-full">
          <img src={formData.image} alt="Recipe" className="w-full h-64 object-cover" />
        </div>
      )}
      <div className="p-8 space-y-8 w-full">
      <div>
        <label htmlFor="title" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Titlu</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Descriere</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm p-2"
          rows="3"
        ></textarea>
      </div>
      <div>
        <label htmlFor="image" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Imagine</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          className="mt-1 block w-full text-xs text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-xs file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
            dark:file:bg-violet-900 dark:file:text-violet-200
            dark:hover:file:bg-violet-800
            p-2"
          accept="image/*"
        />
      </div>
      <div className="flex w-full mb-6">
        <button
          type="button"
          onClick={() => setShowIngredients(true)}
          className={`flex-1 py-2 text-sm font-medium rounded-tl-md rounded-bl-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            showIngredients
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Ingrediente
        </button>
        <button
          type="button"
          onClick={() => setShowIngredients(false)}
          className={`flex-1 py-2 text-sm font-medium rounded-tr-md rounded-br-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            !showIngredients
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Instructiuni
        </button>
      </div>
      {showIngredients ? (
        <div>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center mb-2 space-x-2">
              <input
                type="text"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                placeholder="Quantity"
                className="w-1/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm p-2"
              />
              <select
                value={ingredient.quantityType}
                onChange={(e) => handleIngredientChange(index, 'quantityType', e.target.value)}
                className="w-1/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm p-2"
              >
                <option value="grams">grams</option>
                <option value="piece">piece</option>
                <option value="spoon">spoon</option>
                <option value="ml">ml</option>
              </select>
              <input
                type="text"
                value={ingredient.ingredient}
                onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                placeholder="Ingredient"
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm p-2"
              />
              <button
                type="button"
                onClick={() => deleteIngredient(index)}
                className="px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center text-xs"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="mt-2 px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 flex items-center text-xs">
            <FaPlus className="mr-1" /> Adauga
          </button>
        </div>
      ) : (
        <div>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="flex items-start mb-2">
              <span className="mr-2 mt-1 text-gray-500 dark:text-gray-400 text-xs">{index + 1}.</span>
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm p-2"
                rows="2"
              ></textarea>
            </div>
          ))}
          <button type="button" onClick={addInstruction} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center text-xs">
            <FaPlus className="mr-1" /> Adauga 
          </button>
        </div>
      )}
      <div>
        <label htmlFor="mealType" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Tip masa</label>
        <select
          id="mealType"
          name="mealType"
          value={formData.mealType}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm p-2"
        >
          <option value="Mic dejun">Mic dejun</option>
          <option value="Pranz">Pranz</option>
          <option value="Cina">Cina</option>
        </select>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button type="button" onClick={onCancel} className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 flex items-center text-xs">
            <FaTrash className="mr-1" /> Renunta
          </button>
          <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center text-xs">
            <FaEdit className="mr-1" /> Salveaza
          </button>
        </div>
        {recipe && (
          <button type="button" onClick={() => onDelete(recipe.id)} className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center text-xs">
            <FaTrash className="mr-1" /> Sterge
          </button>
        )}
      </div>
      </div>
    </form>
  );
};

export default RecipeForm;
