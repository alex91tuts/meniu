import { openDB } from 'idb';

const DB_NAME = 'RecipeDB';
const DB_VERSION = 1;
const RECIPE_STORE = 'recipes';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(RECIPE_STORE)) {
      db.createObjectStore(RECIPE_STORE, { keyPath: 'id', autoIncrement: true });
    }
  },
});

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
