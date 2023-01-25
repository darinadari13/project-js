import { TheMovieDbAPI } from './theMovieDbAPI';
import { startSpin, stopSpin } from './preloaderBtn';
import { renderMoviesList } from './my-library';

const refs = {
  openFilmModal: document.querySelector('.js-film-modal-open'),
  filmModal: document.querySelector('.film-modal-backdrop'),
  closeModalBtn: document.querySelector('.film-modal-close'),
  filmModalWrapEl: document.querySelector('.film-modal-wrap'),
  body: document.querySelector('body'),

  filmTrailerBackdrop: document.querySelector('.film-trailer-backdrop'),
  filmTrailerWrap: document.querySelector('.film-trailer'),

  watchedBtn: document.querySelector('#watched'),
  queueBtn: document.querySelector('#queue'),

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
				<button type="submit" class="film-modal-btn-action black" data-movie-id="${movieId}">
              watch the trailer
            </button>
          </div>
        </div>`;
    stopSpin();
    refs.filmModalWrapEl.innerHTML = modalFilmMarkup;

    const watchedFilms = JSON.parse(localStorage.getItem('watched') || '[]');

    let found = watchedFilms.find(obj => obj.id === +movieId);

    const queuedFilms = JSON.parse(localStorage.getItem('queue') || '[]');
    let foundQueue = queuedFilms.find(obj => obj.id === +movieId);

    if (found) {
      document.querySelector('.film-modal-btn-action.accent').textContent =
        'remove from watched';
    }
    if (foundQueue) {
      document.querySelector('.film-modal-btn-action.transparent').textContent =
        'remove from queue';
    }
  } catch (err) {
    console.log(err);
  }

  refs.filmModal.classList.remove('is-hidden');
  refs.body.classList.add('no-scroll');

  refs.closeModalBtn.addEventListener('click', onCloseModalBtn);
  refs.filmModal.addEventListener('click', onCloseModalBtn);
  document.addEventListener('keydown', onEscKeyBtnPress);

  const addToWatchlistBtn = document.querySelector(
    '.film-modal .film-modal-btn-action.accent'
  );
  const addToQueuelistBtn = document.querySelector(
    '.film-modal .film-modal-btn-action.transparent'
  );

  const watchTrailerBtn = document.querySelector(
    '.film-modal .film-modal-btn-action.black'
  );




  addToWatchlistBtn.addEventListener('click', onAddToWatchedBtnClick);
  addToQueuelistBtn.addEventListener('click', onAddToQueueBtnClick);
  watchTrailerBtn.addEventListener('click', onWatchTrailerBtnClick);
}

function onCloseModalBtn(e) {
  if (e.target !== e.currentTarget && e.currentTarget !== refs.closeModalBtn) {
    return;
  }
  refs.filmTrailerWrap.innerHTML = '';
  refs.filmModalWrapEl.innerHTML = '';

  refs.filmModal.classList.add('is-hidden');
  refs.body.classList.remove('no-scroll');

  document.removeEventListener('keydown', onEscKeyBtnPress);
  refs.closeModalBtn.removeEventListener('click', onCloseModalBtn);
}

function onEscKeyBtnPress(e) {
  if (
    e.code === 'Escape' &&
    refs.filmTrailerBackdrop.classList.contains('is-hidden')
  ) {
    refs.filmTrailerWrap.innerHTML = '';
    refs.filmModalWrapEl.innerHTML = '';

    refs.filmModal.classList.add('is-hidden');
    refs.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', onEscKeyBtnPress);
    refs.closeModalBtn.removeEventListener('click', onCloseModalBtn);
  }
}

async function onAddToWatchedBtnClick(e) {
  e.preventDefault();
  document.querySelector('.film-modal-btn-action.accent').textContent =
    'remove from watched';

  const movieId = e.target.dataset.movieId;

  const { data } = await theMovieDbAPI.getMovieInfoById(movieId);
  const watchedFilms = JSON.parse(localStorage.getItem('watched') || '[]');
  let found = watchedFilms.find(obj => obj.id === +movieId);

  if (found) {

    watchedFilms.splice(
      watchedFilms.findIndex(film => +film.id === +movieId),
      1
    );

    localStorage.setItem('watched', JSON.stringify(watchedFilms));

    document.querySelector('.film-modal-btn-action.accent').textContent =
      'add to watched';

  } else {
    watchedFilms.push(data);
    localStorage.setItem('watched', JSON.stringify(watchedFilms));
  }
  if (window.location.pathname === '/my-library.html' && refs.watchedBtn.classList.contains("btn-activ")) {
    renderMoviesList('watched');
  }
}

async function onAddToQueueBtnClick(e) {
  e.preventDefault();
  document.querySelector('.film-modal-btn-action.transparent').textContent =
    'remove from queue';

  const movieId = e.target.dataset.movieId;

  const { data } = await theMovieDbAPI.getMovieInfoById(movieId);
  const watchedFilms = JSON.parse(localStorage.getItem('queue') || '[]');
  let found = watchedFilms.find(obj => obj.id === +movieId);


  if (found) {

    watchedFilms.splice(
      watchedFilms.findIndex(film => +film.id === +movieId),
      1
    );

    localStorage.setItem('queue', JSON.stringify(watchedFilms));

    document.querySelector('.film-modal-btn-action.transparent').textContent =
      'add to queue';

  } else {
    watchedFilms.push(data);
    localStorage.setItem('queue', JSON.stringify(watchedFilms));
  }
  if (window.location.pathname === '/my-library.html' && refs.queueBtn.classList.contains("btn-activ")) {
    renderMoviesList('queue');


    films.push(data);

    localStorage.setItem('queue', JSON.stringify(films));
  }
}

async function onWatchTrailerBtnClick(e) {
  const movieId = e.target.dataset.movieId;

  try {
    const {
      data: { results },
    } = await theMovieDbAPI.getMovieTrailerById(movieId);

    let key = '';
    for (const el of results) {
      if (el.name === 'Official Trailer') {
        key = el.key;
      }
    }
    refs.filmTrailerWrap.innerHTML = `<iframe
	 width="100%"
	 height="100%"
    src="${TheMovieDbAPI.YOUTUBE_URL + key}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>`;

    const el = document.querySelector('iframe');
    const watchTrailerBtn = document.querySelector(
      '.film-modal .film-modal-btn-action.black'
    );

    if (el.src.endsWith('/')) {
      watchTrailerBtn.classList.add('no-trailer');
      watchTrailerBtn.textContent = 'Sorry, no trailer found';
      return;
    }
    refs.filmTrailerBackdrop.classList.remove('is-hidden');
  } catch (err) {
    console.log(err);
  }
}

refs.filmTrailerBackdrop.addEventListener('click', onFilmTrailerBackdropClick);

function onFilmTrailerBackdropClick(e) {
  if (e.target !== e.currentTarget) {
    return;
  }

  refs.filmTrailerBackdrop.classList.add('is-hidden');
  refs.filmTrailerWrap.innerHTML = '';

}
