import api from './api.js';

const { createLike } = api();
const { getLikes } = api();

export const likeTemplate = (likes) => `
  <div class="list-item">
    <p>Esta cerveza tiene: ${likes} likes</p>
  </div>
`;

const addLikeListener = id => {
    const likesForm = document.querySelector('#beer-likes');
    const likesList = document.querySelector('#LikeList');

    likesForm.addEventListener('click', async evt => {
        evt.preventDefault();
        try {
            const response = await createLike(id);
            const valor = await getLikes(id);;
            likesList.lastElementChild.innerHTML =likeTemplate(valor);
        }
        catch (err) {
            console.error(err);
        }
    });
}

export default addLikeListener;