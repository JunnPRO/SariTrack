// MODEL: holds all app data and the functions that change it.
// RULES: never touch the DOM and never import a view.

const STORAGE_KEY = 'saritrack-state';

// The one exported state object. Everything the app knows lives here.
// Field names are shared by the whole group, so don't rename them alone.
export const state = {
  products: [
    { id: 1, name: 'Lucky Me Pancit Canton', price: 15, stock: 40 },
    { id: 2, name: 'Coke Mismo', price: 20, stock: 24 },
    { id: 3, name: 'Safeguard Soap', price: 35, stock: 12 },
  ],
  sales: [
    {
      id: 1,
      productId: 1,
      productName: 'Lucky Me Pancit Canton', // snapshot, so old sales don't change
      unitPrice: 15, // snapshot of the price at the time of sale
      qty: 3,
      total: 45,
      date: '2026-11-03',
    },
  ],
};

// Save the current state to the browser's localStorage.
export const saveState = function () {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

// Load saved data (if any) into the state object.
// We change the properties in place because `state` is an exported const.
export const loadState = function () {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  const data = JSON.parse(saved);
  state.products = data.products ?? [];
  state.sales = data.sales ?? [];
};

// ---- Products (Member 1) ----

// Checks raw form data. Returns an error message, or '' if everything is valid.
export const validateProduct = function (data) {
  const name = String(data.name ?? '').trim();
  if (!name) return 'Product name is required.';

  if (state.products.some(p => p.name.toLowerCase() === name.toLowerCase()))
    return 'That product already exists.';

  if (String(data.price ?? '').trim() === '') return 'Price is required.';
  const price = Number(data.price);
  if (!Number.isFinite(price) || price <= 0) return 'Price must be greater than 0.';

  if (String(data.stock ?? '').trim() === '') return 'Stock is required.';
  const stock = Number(data.stock);
  if (!Number.isInteger(stock) || stock < 0)
    return 'Stock must be a whole number, 0 or more.';

  return '';
};

// Adds a new product to the state and saves it. Assumes the data was validated.
export const addProduct = function (data) {
  const product = {
    id: Math.max(0, ...state.products.map(p => p.id)) + 1, // never reuses an old id
    name: data.name.trim(),
    price: Number(data.price),
    stock: Number(data.stock),
  };
  state.products.push(product);
  saveState();
  return product;
};
