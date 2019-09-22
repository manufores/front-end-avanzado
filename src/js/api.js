
const API_KEY = 'AX7XCHT-91T4QK5-GEAZNYY-FMK0QJZ';

const api = (API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/beers') => {
  const searchAPIEndpoint = `${API_URL}?search=`;
  const showsAPIEndpoint = `${API_URL}`;
  return {
    getShows: async (searchText, searchDate) => {
      try {
        const requestUrl = searchText ? `${searchAPIEndpoint}${searchText}` : showsAPIEndpoint;
        const response = await fetch(requestUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
          }
        });
        if (!response.ok) {
          throw new Error('Error fetching shows');
        }

        const data = await response.json();
        const beers = data.beers;

        let formatData = beers.map(item => {
          if (item.beers) {
            return item.beers;
          }
          return item;
        });

        let searchMonth, searchYear;

        if (searchDate) {
          const date = new Date(searchDate);
          searchMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
          searchYear = date.getFullYear();
          formatData = formatData.filter(item => {
            const [itemMonth, itemYear] = (item.firstBrewed).split('/');
            return (itemMonth == searchMonth && itemYear == searchYear);
          });
        }
        
        
        return formatData;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },
    getShowDetail: async id => {
      try {
        const response = await fetch(`${showsAPIEndpoint}/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
          }
        }
        );
        if (!response.ok) {
          throw new Error('Error getting a show');
        }
        const show = await response.json();
        return show.beer;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getQuotes: async id => {
      try {
        const response = await fetch(`${showsAPIEndpoint}/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
          }
        });
        if (!response.ok) {
          throw new Error('Error fetching quotes');
        }
        const quotes = await response.json();
        if (quotes.beer.comment == undefined) return [];
        const comments = quotes.beer.comment;
        return comments;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    createQuote: async (id, text) => {
      try {
        const response = await fetch(`${showsAPIEndpoint}/${id}/comment`, {
          method: 'POST',
          body: JSON.stringify({ comment: text }),
          headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
          },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Creating quote');
        }
        const responseBody = await response.json();
        return responseBody;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    getLikes: async id => {
      try {
        const response = await fetch(`${showsAPIEndpoint}/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
          }
        });
        if (!response.ok) {
          throw new Error('Error fetching likes');
        }
        const quotes = await response.json();
        const qLikes = quotes.beer.likes;
        return qLikes;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    createLike: async (id) => {
      try {
        const response = await fetch(`${showsAPIEndpoint}/${id}/like`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error('Creating Like');
        }
        let data = await response.json();
        let likes = await data.beer.likes +1;
        return likes;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  };
};

export default api;
