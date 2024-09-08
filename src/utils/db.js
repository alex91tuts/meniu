import { openDB } from 'idb';

const DB_NAME = 'RecipeDB';
const DB_VERSION = 2;
const RECIPE_STORE = 'recipes';
const PERSON_STORE = 'persons';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db, oldVersion, newVersion, transaction) {
    if (!db.objectStoreNames.contains(RECIPE_STORE)) {
      db.createObjectStore(RECIPE_STORE, { keyPath: 'id', autoIncrement: true });
    }
    if (!db.objectStoreNames.contains(PERSON_STORE)) {
      db.createObjectStore(PERSON_STORE, { keyPath: 'id', autoIncrement: true });
    }
  },
});

// Recipe functions
export async function addRecipe(recipe) {
  const db = await dbPromise;
  return db.add(RECIPE_STORE, recipe);
}

export async function getAllRecipes() {
  const db = await dbPromise;
  return db.getAll(RECIPE_STORE);
}

export async function updateRecipe(recipe) {
  const db = await dbPromise;
  return db.put(RECIPE_STORE, recipe);
}

export async function deleteRecipe(id) {
  const db = await dbPromise;
  return db.delete(RECIPE_STORE, id);
}

// Person functions
export async function addPerson(person) {
  const db = await dbPromise;
  return db.add(PERSON_STORE, person);
}

export async function getAllPersons() {
  const db = await dbPromise;
  return db.getAll(PERSON_STORE);
}

export async function updatePerson(person) {
  const db = await dbPromise;
  return db.put(PERSON_STORE, person);
}

export async function deletePerson(id) {
  const db = await dbPromise;
  return db.delete(PERSON_STORE, id);
}
