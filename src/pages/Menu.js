import React from 'react';

const Menu = () => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

  const mealTypes = {
    'Mic dejun': [
      { id: 1, name: 'Omletă cu legume', description: 'Omletă pufoasă cu ardei, ceapă și roșii' },
      { id: 2, name: 'Terci de ovăz', description: 'Terci cremos cu fructe de pădure și miere' },
      { id: 3, name: 'Toast cu avocado', description: 'Pâine prăjită cu avocado și ou poșat' },
    ],
    'Pranz': [
      { id: 1, name: 'Salată Caesar', description: 'Salată proaspătă cu pui la grătar și dressing Caesar' },
      { id: 2, name: 'Supă de linte', description: 'Supă consistentă de linte cu legume' },
      { id: 3, name: 'Wrap cu falafel', description: 'Wrap cu falafel, hummus și legume proaspete' },
    ],
    'Cina': [
      { id: 1, name: 'Somon la cuptor', description: 'File de somon la cuptor cu legume la grătar' },
      { id: 2, name: 'Paste Primavera', description: 'Paste cu un amestec colorat de legume de primăvară' },
      { id: 3, name: 'Pui Tikka Masala', description: 'Pui aromat în sos de roșii cu condimente indiene' },
    ],
  };

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
          <div className="masonry">
            {recipes.map((recipe) => (
              <div key={`${mealType}-${recipe.id}`} className="pin p-4">
                <h2 className="text-xl font-semibold mb-2 dark:text-white">{recipe.name}</h2>
                <p className="dark:text-gray-300">{recipe.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
