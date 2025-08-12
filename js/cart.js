import { AppState, computeCartTotals, checkoutCart, removeFromCart } from './app.js';
import { formatCurrency } from './utils.js';
import { getProduct } from './app.js';

const itemsEl = document.querySelector('#cart-items');
const summaryEl = document.querySelector('#cart-summary');

function render() {
  const { items, subtotal, shipping, tax, total } = computeCartTotals();
  if (items.length === 0) {
    itemsEl.innerHTML = '<p>Your cart is empty.</p>';
    summaryEl.innerHTML = '';
    return;
  }
  itemsEl.innerHTML = items.map(({ id, qty, product, lineTotal }) => `
    <div class="card" style="display:flex;gap:12px;padding:12px;align-items:center;">
      <img src="${product.images[0]}" alt="${product.name}" style="width:96px;height:96px;object-fit:cover;border-radius:12px;border:1px solid #e2e8f0" />
      <div style="flex:1">
        <strong>${product.name}</strong>
        <div class="badge">${product.brand}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
          <label>Qty <input data-qty="${id}" type="number" min="1" value="${qty}" style="width:64px"/></label>
          <button class="btn btn-ghost" data-remove="${id}">Remove</button>
        </div>
      </div>
      <div style="min-width:100px;text-align:right">${formatCurrency(lineTotal)}</div>
    </div>
  `).join('');

  summaryEl.innerHTML = `
    <h2>Summary</h2>
    <div style="display:grid;gap:8px">
      <div style="display:flex;justify-content:space-between"><span>Subtotal</span><strong>${formatCurrency(subtotal)}</strong></div>
      <div style="display:flex;justify-content:space-between"><span>Shipping</span><strong>${shipping === 0 ? 'Free' : formatCurrency(shipping)}</strong></div>
      <div style="display:flex;justify-content:space-between"><span>Tax</span><strong>${formatCurrency(tax)}</strong></div>
      <hr />
      <div style="display:flex;justify-content:space-between"><span>Total</span><strong>${formatCurrency(total)}</strong></div>
      <button id="checkout-stripe" class="btn btn-primary">Checkout with Stripe</button>
      <button id="checkout-paypal" class="btn btn-secondary">Checkout with PayPal</button>
    </div>
  `;

  itemsEl.querySelectorAll('input[type="number"]').forEach(inp => {
    inp.addEventListener('change', () => {
      const id = inp.getAttribute('data-qty');
      const val = Math.max(1, parseInt(inp.value, 10) || 1);
      AppState.cart = AppState.cart.map(i => i.id === id ? { ...i, qty: val } : i);
    });
  });
  itemsEl.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.getAttribute('data-remove'));
      render();
    });
  });
  document.querySelector('#checkout-stripe').addEventListener('click', () => {
    const orderId = checkoutCart('Stripe');
    if (orderId) location.href = `/order-tracking.html?id=${orderId}`;
  });
  document.querySelector('#checkout-paypal').addEventListener('click', () => {
    const orderId = checkoutCart('PayPal');
    if (orderId) location.href = `/order-tracking.html?id=${orderId}`;
  });
}

render();