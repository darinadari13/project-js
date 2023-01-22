import { TheMovieDbAPI } from './theMovieDbAPI';

const theMovieDbAPI = new TheMovieDbAPI();

const filmListElem = document.querySelector('.films-list');
const watchedBtn = document.querySelector('#watched');
const queueBtn = document.querySelector('#queue');

const genresPromise = theMovieDbAPI.getGenres()

function renderMovies(films, genres) {
  const markup = films
    .map(film => {
      const { id, title, poster_path, release_date, genre_ids } = film;

      console.log(genres, genre_ids);

      const filmGenres = genres
        .filter(genre => genre_ids && genre_ids.includes(genre.id))
        .join(', ')

      return `
        <li class="films-list__item poster">
          <a href="#" class="films-list__link" data-movie-id="${id}">
            <div class="films-list__image-wrapper">
              <img
                width="280"
                height="420"
                src="${TheMovieDbAPI.IMG_URL + poster_path}"
                alt="poster of ${TheMovieDbAPI.IMG_URL + poster_path} movie"
                class="films-list__image"
              />
            </div>
          <div class="poster__info">
              <h2 class="poster__title">${title.toUpperCase()}</h2>
              <p class="poster__genre">
                <span class="poster__genres">${filmGenres}</span>
                <span class="poster__year">${parseInt(release_date)} </span>
              </p>
          </div>
          </a>
        </li>
      `;
    })
    .join('');

  filmListElem.innerHTML = markup;
}

function renderMoviesList(type) {
  const films = JSON.parse(localStorage.getItem(type) || '[]');

  genresPromise.then(({ data }) => {
    renderMovies(films, data.genres)
  })
}

watchedBtn.addEventListener('click', () => renderMoviesList('watched'));
queueBtn.addEventListener('click', () => renderMoviesList('queue'))

renderMoviesList('watched')