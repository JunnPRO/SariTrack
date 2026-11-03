// VIEW (Member 1): shows the product list and the form's error message.
// RULES: extends View, never imports the model, never changes state.

import View from './View.js';

class ProductView extends View {
  _parentElement = document.querySelector('.product-list');
  _form = document.querySelector('.product-form');
  _errorElement = document.querySelector('.product-error');

  // The controller subscribes here; the view only passes the form data along.
  addHandlerSubmit(handler) {
    this._form.addEventListener('submit', e => {
      e.preventDefault();
      handler(Object.fromEntries(new FormData(this._form)));
    });
  }

  renderError(message) {
    this._errorElement.textContent = message;
    this._errorElement.hidden = false;
  }

  clearError() {
    this._errorElement.textContent = '';
    this._errorElement.hidden = true;
  }

  clearForm() {
    this._form.reset();
    this._form.querySelector('[name="name"]').focus();
  }

  _generateMarkup() {
    if (!this._data.length)
      return '<p class="empty-message">No products yet. Add one above.</p>';
    return this._data.map(p => this._generateItem(p)).join('');
  }

  _generateItem(p) {
    return `
      <div class="product-item" data-id="${p.id}">
        <strong>${this._escape(p.name)}</strong>
        <span class="product-item__meta">₱${p.price.toFixed(2)} · stock: ${p.stock}</span>
      </div>`;
  }

  // Stops a typed name like <b> from being read as HTML.
  _escape(text) {
    const el = document.createElement('div');
    el.textContent = text;
    return el.innerHTML;
  }
}

export default new ProductView();
