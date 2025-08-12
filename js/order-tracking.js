import { AppState } from './app.js';
import { formatCurrency } from './utils.js';

const form = document.querySelector('#track-form');
const input = document.querySelector('#order-id');
const result = document.querySelector('#order-result');

function renderOrder(order) {
  return `
    <div class="card" style="padding:12px">
      <h2 style="margin-top:0">Order ${order.id}</h2>
      <p>Status: <strong>${order.status}</strong></p>
      <p>Placed: ${new Date(order.createdAt).toLocaleString()}</p>
      <table class="table">
        <thead><tr><th>Item</th><th>Qty</th><th>Total</th></tr></thead>
        <tbody>
          ${order.items.map(i => `<tr><td>${i.product.name}</td><td>${i.qty}</td><td>${formatCurrency(i.lineTotal)}</td></tr>`).join('')}
        </tbody>
      </table>
      <p><strong>Grand Total:</strong> ${formatCurrency(order.total)}</p>
    </div>
  `;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = input.value.trim();
  const order = AppState.orders.find(o => o.id === id);
  result.innerHTML = order ? renderOrder(order) : '<p>Order not found.</p>';
});

// Autoload if id present in URL
const urlId = new URL(location.href).searchParams.get('id');
if (urlId) {
  input.value = urlId;
  form.dispatchEvent(new Event('submit'));
}