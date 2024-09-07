const recipes = [
  {
    id: 1,
    title: 'Omletă cu legume',
    description: 'Omletă pufoasă cu ardei, ceapă și roșii',
    image: 'https://via.placeholder.com/300x200?text=Omleta+cu+legume',
    ingredients: ['3 ouă', '1/4 ardei roșu', '1/4 ceapă', '1 roșie mică', 'Sare', 'Piper'],
    instructions: [
      'Bateți ouăle într-un bol cu sare și piper.',
      'Tăiați legumele mărunt.',
      'Încălziți o tigaie cu puțin ulei și adăugați legumele.',
      'Turnați ouăle bătute peste legume și gătiți până se întărește.',
      'Serviți cald.'
    ],
    mealType: 'Mic dejun'
  },
  {
    id: 2,
    title: 'Salată Caesar',
    description: 'Salată proaspătă cu pui la grătar și dressing Caesar',
    image: 'https://via.placeholder.com/300x200?text=Salata+Caesar',
    ingredients: ['Salată romană', 'Piept de pui', 'Crutoane', 'Parmezan', 'Dressing Caesar'],
    instructions: [
      'Gătiți pieptul de pui la grătar și tăiați-l felii.',
      'Spălați și rupeți salata romană.',
      'Amestecați salata cu crutoane și dressingul Caesar.',
      'Adăugați puiul și parmezanul deasupra.',
      'Serviți imediat.'
    ],
    mealType: 'Pranz'
  },
  {
    id: 3,
    title: 'Somon la cuptor',
    description: 'File de somon la cuptor cu legume la grătar',
    image: 'https://via.placeholder.com/300x200?text=Somon+la+cuptor',
    ingredients: ['File de somon', 'Dovlecei', 'Ardei', 'Ceapă roșie', 'Ulei de măsline', 'Lămâie', 'Ierburi aromatice'],
    instructions: [
      'Preîncălziți cuptorul la 200°C.',
      'Tăiați legumele și așezați-le într-o tavă de copt.',
      'Puneți fileul de somon peste legume.',
      'Stropiți cu ulei de măsline și adăugați felii de lămâie și ierburi aromatice.',
      'Coaceți pentru 20-25 de minute sau până când somonul este gata.'
    ],
    mealType: 'Cina'
  }
];

export default recipes;
