
import { toggleClass, renderLoader } from './ui.js';
import api from './api.js';

const templateShow = ({ principal, name, image, description, beerId }) => `
  <a href="/${beerId}">
    <div class="card ${principal ? 'principal' : 'secondary close'}">
      <header class="card-header">
        <h2>${name}</h2>
      </header>
      <div class="card-content">
        <div class="card-content-image">
          <img src="${image ? image : '/src/images/default.jpg'}">
        </div>
        <div class="card-content-text">
          <p>${description}
          </p>
          <div class="rating-container">
            <button class="icon">
              <i class="fas fa-star"></i>
            </button>
            <button class="icon">
              <i class="far fa-star"></i>
            </button>
            <button class="icon">
              <i class="far fa-star"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </a>
`;

const renderShows = (element, shows) => {
  const htmlShows = shows.map((show, index) => {
    // if (index < 2) {
    //   return templateShow({ ...show, principal: true });
    // }
    return templateShow({ ...show, principal: false });
  }).join('');
  element.innerHTML = `
    <div class="show-section">
      ${htmlShows}
    </div>
  `;
  // codigo para manejar los header
  const headers = document.querySelectorAll('.card.secondary .card-header');
  headers.forEach(header => {
    const element = header.parentNode;
    header.addEventListener('click', evt => {
      evt.preventDefault();
      toggleClass(element, 'close');
    });
  });
};

const { getShows } = api();


const renderShowsDOM = async (searchText, searchDate) => {
  try {
    renderLoader('hide', 'show');
    const mainSection = document.querySelector('main');
    const items = await getShows(searchText, searchDate);
    console.log(items);
    renderShows(mainSection, items);
  } catch (err) {
    console.error(err);
  } finally {
    renderLoader('show', 'hide');
  }
};

export { renderShowsDOM };
