// CONTROLLER: the only layer that talks to both the model and the views.
// RULES: wire user actions to model changes and re-renders; never build HTML here.

import * as model from './model.js';
import productView from './views/ProductView.js';

// ---- Products (Member 1) ----
const controlAddProduct = function (formData) {
  const error = model.validateProduct(formData);
  if (error) {
    productView.renderError(error);
    return;
  }
  productView.clearError();
  model.addProduct(formData);
  productView.render(model.state.products);
  productView.clearForm();
};

// Runs once when the page opens.
const init = function () {
  model.loadState(); // restore saved data after a page reload
  model.saveState(); // make sure the first visit is saved too

  productView.render(model.state.products);
  productView.addHandlerSubmit(controlAddProduct);
  // Members 2 and 3 add their own render and handler lines here.
};

init();
