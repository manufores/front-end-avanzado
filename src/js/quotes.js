import api from './api.js';
import { quoteTemplate } from './quotesForm.js';

const { getQuotes } = api();

const renderQuotes = async id => {
  try {
    const quotesList = document.querySelector('#quoteList');
    const quotes = await getQuotes(id);
    const quotesElements = quotes
      .map(quoteTemplate).join('');
    quotesList.innerHTML = quotesElements;
  } catch (err) {
    console.error(err);
  }
};

export { renderQuotes };
