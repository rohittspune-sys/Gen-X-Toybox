import { Storage, formatCurrency, debounce, uid } from './utils.js';
import { PRODUCTS } from './data.js';

const KEYS = {
  cart: 'gxt_cart',
  wishlist: 'gxt_wishlist',
  orders: 'gxt_orders',
  newsletter: 'gxt_newsletter',
  admin: 'gxt_admin_auth',
  overrides: 'gxt_product_overrides'
};

export const AppState = {
  get cart() { return Storage.get(KEYS.cart, []); },
  set cart(items) { Storage.set(KEYS.cart, items); updateHeaderCounts(); },
  get wishlist() { return Storage.get(KEYS.wishlist, []); },
  set wishlist(items) { Storage.set(KEYS.wishlist, items); updateHeaderCounts(); },
  get orders() { return Storage.get(KEYS.orders, []); },
  set orders(list) { Storage.set(KEYS.orders, list); },
  get overrides() { return Storage.get(KEYS.overrides, {}); },
  set overrides(map) { Storage.set(KEYS.overrides, map); }
};

export function getCatalogProducts() {
  const overrides = AppState.overrides;
  return PRODUCTS.map(p => {
    const o = overrides[p.id] || {};
    return { ...p, ...o };
  });
}

export function getProduct(productId) {
  return getCatalogProducts().find(p => p.id === productId);
}

export function showToast(message) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 1800);
}

export function addToCart(productId, quantity = 1) {
  const existing = AppState.cart.find(i => i.id === productId);
  const product = getProduct(productId);
  if (!product) return;
  const next = existing ? AppState.cart.map(i => i.id === productId ? { ...i, qty: i.qty + quantity } : i) : [...AppState.cart, { id: productId, qty: quantity }];
  AppState.cart = next;
  showToast('Added to cart');
}

export function addToWishlist(productId) {
  if (!AppState.wishlist.includes(productId)) {
    AppState.wishlist = [...AppState.wishlist, productId];
    showToast('Saved to wishlist');
  }
}

export function removeFromCart(productId) {
  AppState.cart = AppState.cart.filter(i => i.id !== productId);
}

export function updateHeaderCounts() {
  const cartCount = AppState.cart.reduce((a, i) => a + i.qty, 0);
  const wishCount = AppState.wishlist.length;
  const cartBtn = document.querySelector('[data-role="cart-count"]');
  const wishBtn = document.querySelector('[data-role="wishlist-count"]');
  if (cartBtn) cartBtn.setAttribute('data-count', String(cartCount));
  if (wishBtn) wishBtn.setAttribute('data-count', String(wishCount));
}

function bindGlobalEvents() {
  document.body.addEventListener('add-to-cart', (e) => {
    addToCart(e.detail.id, 1);
  });
  document.body.addEventListener('add-to-wishlist', (e) => {
    addToWishlist(e.detail.id);
  });

  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value.trim();
      if (!email) return;
      const list = Storage.get(KEYS.newsletter, []);
      if (!list.includes(email)) {
        list.push(email);
        Storage.set(KEYS.newsletter, list);
        showToast('Thanks for subscribing!');
        newsletterForm.reset();
      } else {
        showToast('You are already subscribed');
      }
    });
  }
}

export function computeCartTotals() {
  const items = AppState.cart.map(item => {
    const product = getProduct(item.id);
    return { ...item, product, lineTotal: item.qty * (product?.price || 0) };
  });
  const subtotal = items.reduce((a, i) => a + i.lineTotal, 0);
  const shipping = subtotal > 100 ? 0 : (subtotal > 0 ? 6.99 : 0);
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  return { items, subtotal, shipping, tax, total };
}

export function checkoutCart(paymentProvider = 'Stripe') {
  const { items, total } = computeCartTotals();
  if (items.length === 0) {
    showToast('Your cart is empty');
    return null;
  }
  const orderId = uid('order');
  const order = {
    id: orderId,
    createdAt: new Date().toISOString(),
    status: 'Processing',
    items,
    total,
    provider: paymentProvider
  };
  AppState.orders = [order, ...AppState.orders];
  AppState.cart = [];
  return orderId;
}

function initHeader() {
  updateHeaderCounts();
}

function initSearchShortcut() {
  const searchInput = document.querySelector('input[data-role="site-search"]');
  if (!searchInput) return;
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

function init() {
  initHeader();
  bindGlobalEvents();
  initSearchShortcut();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}