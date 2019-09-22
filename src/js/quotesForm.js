import api from './api.js';

const { createQuote } = api();

export const quoteTemplate = ({ comment, dateComment }) => `
  <div class="list-item">
    <p>${comment}</p>
    <span>${dateComment}</span>
  </div>
`;

const addQuoteListener = id => {
  const quotesForm = document.querySelector('#quote-form');
  const quotesInput = document.querySelector('#quote');
  const quotesList = document.querySelector('#quoteList');

  quotesForm.addEventListener('submit', async evt => {
    evt.preventDefault();
    try {
      if (quotesInput.validity.valid) {
        await createQuote(id, quotesInput.value);
        const showComment = {
          comment: quotesInput.value,
        };

        quotesList.innerHTML += quoteTemplate(showComment);
      }
    } catch (err) {
      console.error(err);
    }
  });
};

export default addQuoteListener;
