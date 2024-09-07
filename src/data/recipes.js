const recipes = [
  {
    id: 1,
    title: 'Omletă cu legume',
    description: 'Omletă pufoasă cu ardei, ceapă și roșii',
    image: 'https://source.unsplash.com/random/?omelette',
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
    title: 'Salată de vinete',
    description: 'Salată tradițională românească de vinete coapte',
    image: 'https://source.unsplash.com/random/?eggplant,salad',
    ingredients: ['3 vinete mari', '1 ceapă', 'Ulei de floarea soarelui', 'Sare'],
    instructions: [
      'Coaceți vinetele pe grătar sau în cuptor până se înmoaie.',
      'Lăsați-le să se răcească, apoi curățați-le de coajă și scurgeți-le de zeamă.',
      'Tocați mărunt vinetele și ceapa.',
      'Amestecați cu ulei și sare după gust.',
      'Serviți cu roșii și pâine prăjită.'
    ],
    mealType: 'Pranz'
  },
  {
    id: 3,
    title: 'Sarmale',
    description: 'Sarmale tradiționale românești cu carne de porc și orez',
    image: 'https://source.unsplash.com/random/?stuffed,cabbage',
    ingredients: ['Varză murată', 'Carne tocată de porc', 'Orez', 'Ceapă', 'Morcov', 'Bulion', 'Cimbru', 'Sare', 'Piper'],
    instructions: [
      'Amestecați carnea tocată cu orezul, ceapa călită, morcovul ras și condimentele.',
      'Înfășurați amestecul în frunze de varză murată.',
      'Așezați sarmalele în oală, adăugați bulion și apă.',
      'Fierbeți la foc mic pentru aproximativ 3 ore.',
      'Serviți cu smântână și mămăligă.'
    ],
    mealType: 'Cina'
  }
];

export default recipes;
