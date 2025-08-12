import { getProduct, addToCart, addToWishlist } from './app.js';
import { formatCurrency } from './utils.js';

const params = new URL(location.href).searchParams;
const id = params.get('id');
const root = document.querySelector('#product-root');
const reviewsEl = document.querySelector('#reviews');

function render() {
  const product = getProduct(id);
  if (!product) {
    root.innerHTML = '<p>Product not found.</p>';
    return;
  }
  root.innerHTML = `
    <div class="product-images">
      ${product.images.map(src => `<img src="${src}" alt="${product.name}">`).join('')}
    </div>
    <div>
      <h1 style="margin-top:0">${product.name}</h1>
      <p>${product.brand} • <span class="badge">${product.type}</span></p>
      <div class="badges" style="margin:8px 0">${product.educationalFocus.map(f => `<span class='badge'>${f}</span>`).join('')}</div>
      <p>${product.description}</p>
      <p><strong>Age</strong>: ${product.ageRange}</p>
      <p class="price">${formatCurrency(product.price)}</p>
      <div style="display:flex;gap:10px;margin-top:10px;">
        <button id="add-cart" class="btn btn-primary">Add to Cart</button>
        <button id="add-wish" class="btn btn-ghost">Add to Wishlist</button>
      </div>
    </div>
  `;
  reviewsEl.innerHTML = product.reviews?.length ? product.reviews.map(r => `<div class="testimonial"><strong>${r.user}</strong> — ${'★'.repeat(r.rating)}<p>${r.text}</p></div>`).join('') : '<p>No reviews yet.</p>';
  document.querySelector('#add-cart').addEventListener('click', () => addToCart(id, 1));
  document.querySelector('#add-wish').addEventListener('click', () => addToWishlist(id));
}

render();