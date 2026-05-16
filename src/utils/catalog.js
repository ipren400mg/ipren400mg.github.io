import { categories } from '../data/categories';

const itemsCache = new Map();

export function getCategories() {
  return categories;
}

export function getCategoryMeta(name) {
  return categories.find((category) => category.name === name) ?? null;
}

export async function getCategoryItems(name) {
  if (!name) {
    return [];
  }

  if (itemsCache.has(name)) {
    return itemsCache.get(name);
  }

  const response = await fetch(`/data/${name}.json`);

  if (!response.ok) {
    throw new Error(`Unable to load category: ${name}`);
  }

  const items = await response.json();
  itemsCache.set(name, items);
  return items;
}

export async function getCategory(name) {
  const category = getCategoryMeta(name);

  if (!category) {
    return null;
  }

  const items = await getCategoryItems(name);
  return { ...category, items };
}

export async function getItem(categoryName, itemName) {
  const items = await getCategoryItems(categoryName);
  return items.find((item) => item.name === itemName) ?? null;
}
