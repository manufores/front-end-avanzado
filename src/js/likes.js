import api from './api.js';
import { likeTemplate } from './likesForm.js';
const { getLikes } = api();
const renderLikes = async id => {
  try {
    const likesList = document.querySelector('#LikeList');
    const likes = await getLikes(id);
    const likesElements = likeTemplate(likes);
    likesList.innerHTML = likesElements;
  } catch (err) {
    console.error(err);
  }
};
export { renderLikes };
