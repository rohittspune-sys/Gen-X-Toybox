import { showToast } from './app.js';

const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Thanks! We will reply shortly.');
    form.reset();
  });
}