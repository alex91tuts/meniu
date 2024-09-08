export function generateShoppingList(menuItems) {
  const ingredientMap = new Map();

  menuItems.forEach(menuItem => {
    const numberOfPeople = menuItem.profiles.length;
    menuItem.recipe.ingredients.forEach(ingredient => {
      const key = `${ingredient.ingredient.toLowerCase()}-${ingredient.quantityType}`;
      const currentQuantity = ingredientMap.get(key) || { 
        ingredient: ingredient.ingredient, 
        quantity: 0, 
        quantityType: ingredient.quantityType,
        checked: false,
        inPantry: false
      };
      currentQuantity.quantity += parseFloat(ingredient.quantity) * numberOfPeople;
      ingredientMap.set(key, currentQuantity);
    });
  });

  const categorizedIngredients = Array.from(ingredientMap.values()).reduce((acc, ingredient) => {
    const category = getCategoryForIngredient(ingredient.ingredient);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(ingredient);
    return acc;
  }, {});

  return Object.entries(categorizedIngredients).map(([category, items], index) => ({
    id: index + 1,
    category,
    items: items.map(item => ({
      ...item,
      quantity: Math.round(item.quantity * 100) / 100 // Round to 2 decimal places
    }))
  }));
}

function getCategoryForIngredient(ingredient) {
  // This is a simple categorization. You might want to expand this based on your needs.
  const categories = {
    'Produce': ['apple', 'banana', 'lettuce', 'tomato', 'onion', 'garlic'],
    'Dairy': ['milk', 'cheese', 'yogurt', 'butter', 'cream'],
    'Meat': ['chicken', 'beef', 'pork', 'fish', 'salmon'],
    'Grains': ['rice', 'pasta', 'bread', 'flour'],
    'Canned Goods': ['beans', 'tomato sauce', 'corn', 'soup'],
    'Spices': ['salt', 'pepper', 'cumin', 'paprika', 'oregano'],
  };

  const lowerIngredient = ingredient.toLowerCase();
  for (const [category, items] of Object.entries(categories)) {
    if (items.some(item => lowerIngredient.includes(item))) {
      return category;
    }
  }

  return 'Other';
}
