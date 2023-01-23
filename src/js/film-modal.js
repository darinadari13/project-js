import { TheMovieDbAPI } from './theMovieDbAPI';
import { startSpin, stopSpin } from './preloaderBtn';

const refs = {
  openFilmModal: document.querySelector('.js-film-modal-open'),
  filmModal: document.querySelector('.film-modal-backdrop'),
  closeModalBtn: document.querySelector('.film-modal-close'),
  filmModalWrapEl: document.querySelector('.film-modal-wrap'),
};
refs.openFilmModal.addEventListener('click', onFilmCardClick);

const theMovieDbAPI = new TheMovieDbAPI();

async function onFilmCardClick(e) {
  e.preventDefault();
  startSpin();
  if (e.target === e.currentTarget) {
    return;
  }

  const filmLinkEl = e.target.closest('a.films-list__link');
  const movieId = filmLinkEl.dataset.movieId;

  try {
    const { data } = await theMovieDbAPI.getMovieInfoById(movieId);
    const {
      poster_path,
      title,
      vote_average,
      vote_count,
      popularity,
      original_title,
      genres,
      overview,
    } = data;

    const filmGenres = genres.map(genre => genre.name).join(', ');

    const modalFilmMarkup = `
        <div class="film-modal-img">
          <img src="${TheMovieDbAPI.IMG_URL + poster_path}" alt="poster of ${TheMovieDbAPI.IMG_URL + poster_path
      } movie" />
        </div>
        <div class="film-modal-info">
          <h2 class="film-modal-title">${title.toUpperCase()}</h2>
          <ul class="film-modal-stats">
            <li class="film-modal-stats-row">
              <p class="film-modal-stats-name">Vote / Votes</p>
              <p class="film-modal-stats-value">
                <span>${vote_average.toFixed(
        1
      )}</span> / <span>${vote_count}</span>
              </p>
            </li>
            <li class="film-modal-stats-row">
              <p class="film-modal-stats-name">Popularity</p>
              <p class="film-modal-stats-value">${popularity.toFixed(1)}</p>
            </li>
            <li class="film-modal-stats-row">
              <p class="film-modal-stats-name">Original Title</p>
              <p class="film-modal-stats-value upper">${original_title}</p>
            </li>
            <li class="film-modal-stats-row">
              <p class="film-modal-stats-name">Genre</p>
              <p class="film-modal-stats-value">${filmGenres}</p>
            </li>
          </ul>
          <div class="film-modal-description">
            <p class="upper">about</p>
            <p class="film-modal-description-text">
              ${overview}
            </p>
          </div>
          <div class="film-modal-actions">
            <button type="submit" class="film-modal-btn-action accent" data-movie-id="${movieId}">
              add to Watched
            </button>
            <button type="submit" class="film-modal-btn-action transparent" data-movie-id="${movieId}">
              add to queue
            </button>
          </div>
        </div>`;
    stopSpin();
    refs.filmModalWrapEl.innerHTML = modalFilmMarkup;
  } catch (err) {
    console.log(err);
  }

  refs.filmModal.classList.remove('is-hidden');

  refs.closeModalBtn.addEventListener('click', onCloseModalBtn);
  refs.filmModal.addEventListener('click', onCloseModalBtn);
  document.addEventListener('keydown', onEscKeyBtnPress);

  const addToWatchlistBtn = document.querySelector('.film-modal .film-modal-btn-action.accent')
  const addToQueuelistBtn = document.querySelector('.film-modal .film-modal-btn-action.transparent')

  addToWatchlistBtn.addEventListener('click', onAddToWatchedBtnClick)
  addToQueuelistBtn.addEventListener('click', onAddToQueueBtnClick)
}

function onCloseModalBtn(e) {
  if (e.target !== e.currentTarget && e.currentTarget !== refs.closeModalBtn) {
    return;
  }
  refs.filmModalWrapEl.innerHTML = '';
  refs.filmModal.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscKeyBtnPress);
  refs.closeModalBtn.removeEventListener('click', onCloseModalBtn);
}

function onEscKeyBtnPress(e) {
  if (e.code === 'Escape') {
    onCloseModalBtn();
  }
}



async function onAddToWatchedBtnClick(e) {
  e.preventDefault();

  const movieId = e.target.dataset.movieId;

  try {
    const { data } = await theMovieDbAPI.getMovieInfoById(movieId);

    const watchedFilms = JSON.parse(localStorage.getItem("watched") || '[]');
    watchedFilms.push(data);

    localStorage.setItem("watched", JSON.stringify(watchedFilms));
  } catch (err) {
    console.log(err);
  }
}

async function onAddToQueueBtnClick(e) {
  e.preventDefault();

  const movieId = e.target.dataset.movieId;

  try {
    const { data } = await theMovieDbAPI.getMovieInfoById(movieId);

    const watchedFilms = JSON.parse(localStorage.getItem("queue") || '[]');
    watchedFilms.push(data);

    localStorage.setItem("queue", JSON.stringify(watchedFilms));
  } catch (err) {
    console.log(err);
  }
}
