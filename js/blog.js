import { BLOG_POSTS } from './data.js';

const grid = document.querySelector('#blog-grid');

grid.innerHTML = BLOG_POSTS.map(p => `
  <article class="card">
    <div class="media"><img src="${p.image}" alt="${p.title}" loading="lazy" /></div>
    <div class="body">
      <div class="badge">${p.category}</div>
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
    </div>
  </article>
`).join('');