import api from './api.js';
import { renderQuotes } from './quotes.js';
import { renderLikes } from './likes.js';

const { getShowDetail } = api();

const detailTemplate = ({ beerId, name, description, image }) => `
  <div class="detail-section">
    <header id="${beerId}">
      <div class="title-section">
        <h1>${name}</h1>
      </div>
      <div class="image-container">
        <img src="${image ? image : '/images/defaultImage.png'}" />
      </div>
    </header>
    <div class="content">
      ${description}
    </div>
  </div>
`;

const renderDetail = async id => {
  try {
    const selector = document.querySelector('main');
    const [beer] = await Promise.all([getShowDetail(id), renderQuotes(id), renderLikes(id)]);
    selector.innerHTML = detailTemplate(beer);
  } catch (err) {
    console.error(err);
  }
};

export default renderDetail;
