import { COLLECTIONS, BRANDS, AGE_RANGES, FOCUS } from './data.js';
import { getCatalogProducts } from './app.js';
import { productCard, mountProductCardInteractions, skeletonCard } from './components.js';

const grid = document.querySelector('#product-grid');
const ageSel = document.querySelector('#filter-age');
const typeSel = document.querySelector('#filter-type');
const brandSel = document.querySelector('#filter-brand');
const focusSel = document.querySelector('#filter-focus');
const priceRange = document.querySelector('#filter-price');
const priceOut = document.querySelector('#price-out');
const searchInput = document.querySelector('#search');

function optionList(values, placeholder) {
  return ['<option value="">' + placeholder + '</option>'].concat(values.map(v => `<option value="${v}">${v}</option>`)).join('');
}

function initFilters() {
  ageSel.innerHTML = optionList(AGE_RANGES, 'Any Age');
  typeSel.innerHTML = optionList(['Retro Classics','Modern Learning','For Collectors'], 'Any Type');
  brandSel.innerHTML = optionList([...new Set(getCatalogProducts().map(p => p.brand))], 'Any Brand');
  focusSel.innerHTML = optionList(FOCUS, 'Any Focus');
  priceRange.value = '200';
}

function getFilterState() {
  return {
    age: ageSel.value,
    type: typeSel.value,
    brand: brandSel.value,
    focus: focusSel.value,
    maxPrice: Number(priceRange.value),
    query: searchInput.value.trim().toLowerCase()
  };
}

function filterProducts(products, f) {
  return products.filter(p => {
    if (f.age && p.ageRange !== f.age) return false;
    if (f.type && p.type !== f.type) return false;
    if (f.brand && p.brand !== f.brand) return false;
    if (f.focus && !p.educationalFocus.includes(f.focus)) return false;
    if (p.price > f.maxPrice) return false;
    if (f.query && !(p.name.toLowerCase().includes(f.query) || p.brand.toLowerCase().includes(f.query))) return false;
    return true;
  });
}

function render(products) {
  if (!grid) return;
  grid.innerHTML = '';
  if (products.length === 0) {
    grid.innerHTML = '<p>No products match your filters.</p>';
    return;
  }
  grid.innerHTML = products.map(productCard).join('');
  mountProductCardInteractions(grid);
}

function updatePriceLabel() {
  priceOut.textContent = `$0–$${priceRange.value}`;
}

function load() {
  if (!grid) return;
  grid.innerHTML = Array.from({ length: 6 }).map(skeletonCard).join('');
  setTimeout(() => {
    const products = getCatalogProducts();
    const filtered = filterProducts(products, getFilterState());
    render(filtered);
  }, 200);
}

initFilters();
updatePriceLabel();
['change','input','keyup'].forEach(ev => {
  ageSel.addEventListener('change', load);
  typeSel.addEventListener('change', load);
  brandSel.addEventListener('change', load);
  focusSel.addEventListener('change', load);
  priceRange.addEventListener('input', () => { updatePriceLabel(); load(); });
  searchInput.addEventListener('input', load);
});

load();