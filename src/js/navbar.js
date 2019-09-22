
import { toggle } from './ui.js';
import { renderShowsDOM } from './shows.js';
import storage from './storage.js';

const { setItem, getItem } = storage('lStorage');

const navbar = document.querySelector('#navbar');
const searchIcon = document.querySelector('#navbar-search');
const closeIcon = document.querySelector('#navbar-close');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#navbar .input.search');
const searchDate = document.querySelector('#searchDate');

searchInput.value = getItem('navbar-input');
searchDate.value = getItem('searchDate');

console.log(searchDate.value);

const handleNavBar = toggle(navbar);

searchIcon.addEventListener('click', () => (
  handleNavBar('no-search', 'search')
));

closeIcon.addEventListener('click', () => {
  toggle(navbar)('search', 'no-search');
});

searchForm.addEventListener('submit', evt => {
  evt.preventDefault();
  setItem('navbar-input', searchInput.value);
  setItem('searchDate-input', searchDate.value);
  renderShowsDOM(searchInput.value, searchDate.value);
});

const hideFilter = () => handleNavBar('filter', 'no-filter');
const showFilter = () => handleNavBar('no-filter', 'filter');

export { hideFilter, showFilter };
