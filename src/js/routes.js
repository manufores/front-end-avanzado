/* eslint-disable no-undef */
import { renderShowsDOM } from './shows.js';
import { hideFilter, showFilter } from './navbar.js';
import { showQuotesForm, hideQuotesForm } from './ui.js';
import renderDetail from './detail.js';
import addQuoteListener from './quotesForm.js';
import addLikeListener from './likesForm.js';

page('/', () => { // eslint-disable-line
  console.log('Home page');
  showFilter();
  hideQuotesForm();
  renderShowsDOM();
});
page('/:beerId', ctx => {
  console.log('Detail');
  const { params: { beerId } } = ctx;
  hideFilter();
  showQuotesForm();
  renderDetail(beerId);
  addQuoteListener(beerId);
  addLikeListener(beerId);
});
page();
