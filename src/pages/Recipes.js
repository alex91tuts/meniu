import React from 'react';
import RecipeCard from '../components/RecipeCard';

const Recipes = () => {
  const recipes = [
    { 
      id: 1, 
      title: 'Spaghetti Carbonara', 
      image: 'https://example.com/spaghetti-carbonara.jpg',
      participants: ['https://example.com/participant1.jpg', 'https://example.com/participant2.jpg']
    },
    { 
      id: 2, 
      title: 'Chicken Stir Fry', 
      image: 'https://example.com/chicken-stir-fry.jpg',
      participants: ['https://example.com/participant3.jpg', 'https://example.com/participant4.jpg']
    },
    { 
      id: 3, 
      title: 'Greek Salad', 
      image: 'https://example.com/greek-salad.jpg',
      participants: ['https://example.com/participant5.jpg']
    },
    { 
      id: 4, 
      title: 'Beef Tacos', 
      image: 'https://example.com/beef-tacos.jpg',
      participants: ['https://example.com/participant1.jpg', 'https://example.com/participant3.jpg', 'https://example.com/participant5.jpg']
    },
    { 
      id: 5, 
      title: 'Vegetable Curry', 
      image: 'https://example.com/vegetable-curry.jpg',
      participants: ['https://example.com/participant2.jpg', 'https://example.com/participant4.jpg']
    },
    { 
      id: 6, 
      title: 'Grilled Salmon', 
      image: 'https://example.com/grilled-salmon.jpg',
      participants: ['https://example.com/participant1.jpg', 'https://example.com/participant5.jpg']
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Recipes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            participants={recipe.participants}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
