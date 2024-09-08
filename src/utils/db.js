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

// Helper function to compress base64 image
export function compressImage(base64String, maxWidth = 300, maxHeight = 300) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.src = base64String;
  });
}
