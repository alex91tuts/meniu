import { openDB } from 'idb';

const DB_NAME = 'RecipeDB';
const DB_VERSION = 5; // Increment the DB_VERSION
const RECIPE_STORE = 'recipes';
const PERSON_STORE = 'persons';
const MENU_ITEM_STORE = 'menuItems';
const SHOPPING_LIST_STORE = 'shoppingLists';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db, oldVersion, newVersion, transaction) {
    if (!db.objectStoreNames.contains(RECIPE_STORE)) {
      db.createObjectStore(RECIPE_STORE, { keyPath: 'id', autoIncrement: true });
    }
    if (!db.objectStoreNames.contains(PERSON_STORE)) {
      db.createObjectStore(PERSON_STORE, { keyPath: 'id', autoIncrement: true });
    }
    if (!db.objectStoreNames.contains(MENU_ITEM_STORE)) {
      const menuItemStore = db.createObjectStore(MENU_ITEM_STORE, { keyPath: 'id', autoIncrement: true });
      menuItemStore.createIndex('dateIndex', 'date');
    }
    if (!db.objectStoreNames.contains(SHOPPING_LIST_STORE)) {
      const shoppingListStore = db.createObjectStore(SHOPPING_LIST_STORE, { keyPath: 'weekStart' });
      shoppingListStore.createIndex('weekStartIndex', 'weekStart', { unique: true });
    }
    console.log('Database upgrade completed. New version:', newVersion);
  },
});

// Recipe functions
export async function addRecipe(recipe) {
  const db = await dbPromise;
  return db.add(RECIPE_STORE, recipe);
}

export async function getAllRecipes() {
  const db = await dbPromise;
  const recipes = await db.getAll(RECIPE_STORE);
  console.log('Retrieved recipes:', recipes);
  return recipes;
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

// Menu Item functions
export async function addMenuItem(menuItem) {
  const db = await dbPromise;
  console.log('Adding menu item to database:', menuItem);
  const result = await db.add(MENU_ITEM_STORE, {
    ...menuItem,
    profileIds: menuItem.profiles ? menuItem.profiles.map(profile => profile.id) : []
  });
  console.log('Menu item added, result:', result);
  return result;
}

export async function getMenuItemsWithProfiles(startDate, endDate) {
  const db = await dbPromise;
  const tx = db.transaction([MENU_ITEM_STORE, PERSON_STORE, RECIPE_STORE], 'readonly');
  const menuItemStore = tx.objectStore(MENU_ITEM_STORE);
  const personStore = tx.objectStore(PERSON_STORE);
  const recipeStore = tx.objectStore(RECIPE_STORE);

  console.log('Fetching menu items for date range:', startDate, 'to', endDate);
  let menuItems;
  if (startDate && endDate) {
    try {
      menuItems = await menuItemStore.index('dateIndex').getAll(IDBKeyRange.bound(startDate, endDate));
    } catch (error) {
      console.error('Error fetching menu items:', error);
      menuItems = [];
    }
  } else {
    menuItems = await menuItemStore.getAll();
  }
  console.log('Retrieved menu items:', menuItems);

  const menuItemsWithDetails = await Promise.all(menuItems.map(async (item) => {
    const profiles = await Promise.all((item.profileIds || []).map(id => personStore.get(id)));
    const recipe = await recipeStore.get(item.recipeId);
    return {
      ...item,
      profiles,
      recipe
    };
  }));

  console.log('Menu items with details:', menuItemsWithDetails);
  return menuItemsWithDetails;
}

export async function updateMenuItem(menuItem) {
  const db = await dbPromise;
  return db.put(MENU_ITEM_STORE, {
    ...menuItem,
    profileIds: menuItem.profiles.map(profile => profile.id)
  });
}

export async function deleteMenuItem(id) {
  const db = await dbPromise;
  return db.delete(MENU_ITEM_STORE, id);
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

// Shopping List functions
export async function addShoppingList(shoppingList) {
  const db = await dbPromise;
  return db.add(SHOPPING_LIST_STORE, shoppingList);
}

export async function getShoppingList(weekStart) {
  const db = await dbPromise;
  return db.getFromIndex(SHOPPING_LIST_STORE, 'weekStartIndex', weekStart);
}

export async function updateShoppingList(shoppingList) {
  const db = await dbPromise;
  return db.put(SHOPPING_LIST_STORE, shoppingList);
}

export async function deleteShoppingList(id) {
  const db = await dbPromise;
  return db.delete(SHOPPING_LIST_STORE, id);
}
