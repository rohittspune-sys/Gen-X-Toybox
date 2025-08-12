import { formatCurrency, lazyImage } from './utils.js';

export function icon(name) {
  const map = {
    cart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 5h2l1.6 9.6a2 2 0 0 0 2 1.7h7.7a2 2 0 0 0 2-1.6l1.2-6.7H7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="20" r="1.6" fill="currentColor"/><circle cx="18" cy="20" r="1.6" fill="currentColor"/></svg>',
    heart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20.8 12.1c0 5.6-8.8 9.3-8.8 9.3S3.2 17.7 3.2 12.1a4.8 4.8 0 0 1 8-3.6l.8.7.8-.7a4.8 4.8 0 0 1 8 3.6Z" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>',
    star: '<svg width="18" height="18" viewBox="0 0 24 24" fill="#f5b301"><path d="M12 17.3 6 21l1.6-6.9L2 9.2l7-.6L12 2l3 6.6 7 .6-5.6 4.9L18 21z"/></svg>',
    bolt: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2 3 14h7l-2 8 10-12h-7z" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>',
    shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-3z" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>',
    truck: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 7h10v9H3zM13 10h4l4 4v2h-8z" stroke="currentColor" stroke-width="1.6" fill="none"/><circle cx="7" cy="18" r="1.7" fill="currentColor"/><circle cx="17" cy="18" r="1.7" fill="currentColor"/></svg>',
    lock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" stroke-width="1.6"/></svg>'
  };
  return map[name] || '';
}

export function ratingStars(rating) {
  const full = Math.round(rating);
  return `<div aria-label="Rating ${rating} out of 5">${Array.from({ length: 5 }).map((_, i) => i < full ? icon('star') : '<svg width="18" height="18" viewBox="0 0 24 24" fill="#e2e8f0"><path d="M12 17.3 6 21l1.6-6.9L2 9.2l7-.6L12 2l3 6.6 7 .6-5.6 4.9L18 21z"/></svg>').join('')}</div>`;
}

export function productCard(product) {
  const img = product.images?.[0] || '';
  return `
    <article class="card">
      <a class="media" href="/product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${product.name}">
        <img src="${img}" alt="${product.name}" loading="lazy" />
      </a>
      <div class="body">
        <h3>${product.name}</h3>
        <p>${product.brand}</p>
        <div class="badges" style="margin:8px 0 10px">${product.educationalFocus.map(f => `<span class='badge'>${f}</span>`).join('')}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <span class="price">${formatCurrency(product.price)}</span>
          ${ratingStars(product.rating)}
        </div>
        <div style="display:flex;gap:8px;margin-top:10px;">
          <button class="btn btn-primary add-to-cart" data-id="${product.id}">${icon('cart')} Add</button>
          <button class="btn btn-ghost add-to-wishlist" data-id="${product.id}">${icon('heart')} Wish</button>
        </div>
      </div>
    </article>
  `;
}

export function mountProductCardInteractions(root) {
  root.addEventListener('click', (e) => {
    const addCart = e.target.closest('.add-to-cart');
    const addWish = e.target.closest('.add-to-wishlist');
    if (addCart) {
      const id = addCart.getAttribute('data-id');
      root.dispatchEvent(new CustomEvent('add-to-cart', { bubbles: true, detail: { id } }));
    }
    if (addWish) {
      const id = addWish.getAttribute('data-id');
      root.dispatchEvent(new CustomEvent('add-to-wishlist', { bubbles: true, detail: { id } }));
    }
  });
}

export function skeletonCard() {
  return `
    <article class="card" aria-busy="true">
      <div class="media" style="background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 37%,#f1f5f9 63%);background-size:400% 100%;animation:shimmer 1.4s infinite;"></div>
      <div class="body">
        <div style="height:18px;background:#f1f5f9;border-radius:8px;margin:6px 0;width:60%"></div>
        <div style="height:12px;background:#f1f5f9;border-radius:8px;margin:10px 0;width:40%"></div>
      </div>
    </article>
  `;
}

const shimmer = document.createElement('style');
shimmer.textContent = `@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`;
document.head.appendChild(shimmer);