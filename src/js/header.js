import debounce from 'lodash.debounce';
import { TheMovieDbAPI } from './theMovieDbAPI';
import {
  renderGenresArr,
  renderMarkup,
  renderPopularFilmCards,
} from './renderPopularFilmCards.js';

const theMovieDbAPI = new TheMovieDbAPI();
const searchFormEl = document.querySelector('.search');
const filmListElem = document.querySelector('.films-list');
const message = document.querySelector('.search__warning');
const DEBOUNCE_DELAY = 500;

renderGenresArr();

const onSearchFormSubmit = async event => {
  event.preventDefault();

  theMovieDbAPI.query = event.target.value.trim();
  theMovieDbAPI.page = 1;

  if (theMovieDbAPI.query !== '') {
    try {
      const {
        data: { results: filmArr },
      } = await theMovieDbAPI.fetchUniqFilms();

      if (filmArr.length === 0) {
        message.innerHTML =
          'Search result not successful. Enter the correct movie name.';

        filmListElem.innerHTML = '';
        renderPopularFilmCards();
        return;
      }

      message.innerHTML = '';
      renderMarkup(filmArr);
    } catch (err) {
      console.log(err);
    }
  } else {
    message.innerHTML = '';
    renderPopularFilmCards();
  }
};

searchFormEl && searchFormEl.addEventListener(
  'input',
  debounce(onSearchFormSubmit, DEBOUNCE_DELAY)
);
