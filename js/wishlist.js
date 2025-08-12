import { AppState } from './app.js';
import { getProduct } from './app.js';
import { productCard, mountProductCardInteractions } from './components.js';

const grid = document.querySelector('#wishlist-grid');

function render() {
  const ids = AppState.wishlist;
  if (ids.length === 0) {
    grid.innerHTML = '<p>No items in wishlist.</p>';
    return;
  }
  const products = ids.map(getProduct).filter(Boolean);
  grid.innerHTML = products.map(productCard).join('');
  mountProductCardInteractions(grid);
}

render();