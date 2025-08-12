import { getCatalogProducts, AppState } from './app.js';
import { formatCurrency } from './utils.js';

const tbody = document.querySelector('#inventory-table tbody');

function renderInventory() {
  const products = getCatalogProducts();
  tbody.innerHTML = products.map(p => `
    <tr>
      <td>${p.name}</td>
      <td><input type="number" step="0.01" value="${p.price}" data-price="${p.id}" /></td>
      <td><input type="number" step="1" value="${p.stock}" data-stock="${p.id}" /></td>
      <td><button class="btn btn-ghost" data-save="${p.id}">Save</button></td>
    </tr>
  `).join('');

  tbody.querySelectorAll('[data-save]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-save');
      const price = parseFloat(tbody.querySelector(`[data-price="${id}"]`).value);
      const stock = parseInt(tbody.querySelector(`[data-stock="${id}"]`).value, 10);
      const overrides = AppState.overrides;
      AppState.overrides = { ...overrides, [id]: { ...(overrides[id]||{}), price, stock } };
      btn.textContent = 'Saved';
      setTimeout(() => btn.textContent = 'Save', 1000);
    });
  });
}

function renderAnalytics() {
  const orders = AppState.orders;
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const mOrders = orders.filter(o => {
    const d = new Date(o.createdAt);
    return d.getMonth() === month && d.getFullYear() === year;
  });
  const revenue = mOrders.reduce((a, o) => a + o.total, 0);
  const avg = mOrders.length ? revenue / mOrders.length : 0;
  document.querySelector('#m-rev').textContent = formatCurrency(revenue);
  document.querySelector('#m-orders').textContent = mOrders.length;
  document.querySelector('#m-avg').textContent = formatCurrency(avg);
}

renderInventory();
renderAnalytics();