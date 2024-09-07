import React from 'react';
import RecipeCard from '../components/RecipeCard';

const Menu = () => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

  const mealTypes = {
    'Mic dejun': [
      { id: 1, title: 'Omletă cu legume', description: 'Omletă pufoasă cu ardei, ceapă și roșii', image: 'https://example.com/omleta.jpg' },
      { id: 2, title: 'Terci de ovăz', description: 'Terci cremos cu fructe de pădure și miere', image: 'https://example.com/terci.jpg' },
      { id: 3, title: 'Toast cu avocado', description: 'Pâine prăjită cu avocado și ou poșat', image: 'https://example.com/toast.jpg' },
    ],
    'Pranz': [
      { id: 1, title: 'Salată Caesar', description: 'Salată proaspătă cu pui la grătar și dressing Caesar', image: 'https://example.com/salata.jpg' },
      { id: 2, title: 'Supă de linte', description: 'Supă consistentă de linte cu legume', image: 'https://example.com/supa.jpg' },
      { id: 3, title: 'Wrap cu falafel', description: 'Wrap cu falafel, hummus și legume proaspete', image: 'https://example.com/wrap.jpg' },
    ],
    'Cina': [
      { id: 1, title: 'Somon la cuptor', description: 'File de somon la cuptor cu legume la grătar', image: 'https://example.com/somon.jpg' },
      { id: 2, title: 'Paste Primavera', description: 'Paste cu un amestec colorat de legume de primăvară', image: 'https://example.com/paste.jpg' },
      { id: 3, title: 'Pui Tikka Masala', description: 'Pui aromat în sos de roșii cu condimente indiene', image: 'https://example.com/pui.jpg' },
    ],
  };

  const participants = [
    'https://randomuser.me/api/portraits/women/1.jpg',
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/men/2.jpg'
  ];

  return (
    <div>
      <div className="flex justify-between mb-6 overflow-x-auto">
        {weekDays.map((day, index) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + index);
          const isCurrentDay = date.toDateString() === currentDate.toDateString();

          return (
            <div key={day} className="flex flex-col items-center mx-2">
              <span className="text-sm font-medium dark:text-gray-300">{day}</span>
              <span className="text-lg font-semibold dark:text-white">{date.getDate().toString().padStart(2, '0')}</span>
              {isCurrentDay && <div className="w-1 h-1 bg-red-500 rounded-full mt-1"></div>}
            </div>
          );
        })}
      </div>
      {Object.entries(mealTypes).map(([mealType, recipes]) => (
        <div key={mealType} className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">{mealType}</h2>
            <button className="text-2xl font-bold text-red-500 dark:text-red-400">+</button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard
                key={`${mealType}-${recipe.id}`}
                title={recipe.title}
                image={recipe.image}
                participants={participants}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
