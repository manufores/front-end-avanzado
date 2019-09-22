const loader = document.querySelector('#loader');
const detailSection = document.querySelector('#detailSection');

export const showQuotesForm = () =>
  detailSection.innerHTML = `
    <div id="detail" class="detail-content"></div>
    <div class="quotes-list">
      <h2>Quotes</h2>
      <div id="quoteList">
      </div>
    </div>
    <form id="quote-form" class="quote-form" novalidate>
      <div class="quote-input">
        <label for="quote">Quote of this beer</label>
        <input required id="quote" placeholder="Add your comment" class="input primary" type="text">
      </div>
      <button type="submit" class="button primary">Add quote</button>
    </form>

    <div id="beer-likes" class="quotes-list">
      <h2>Likes</h2>
      <div id="LikeList"></div>
      <button type="submit" class="button primary">Add Like</button>
    </div>
  `;
export const hideQuotesForm = () =>
  detailSection.innerHTML = '';

export const toggle = elemento => (removeClass, addClass) => {
  elemento.classList.remove(removeClass);
  elemento.classList.add(addClass);
};

export const toggleClass = (elemento, toggleClass) => {
  elemento.classList.toggle(toggleClass);
};

export const renderLoader = toggle(loader);