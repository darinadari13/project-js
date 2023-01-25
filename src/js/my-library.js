import { TheMovieDbAPI } from './theMovieDbAPI';
import Pagination from 'tui-pagination';
const theMovieDbAPI = new TheMovieDbAPI();


const filmListElem = document.querySelector('.films-list');
const watchedBtn = document.querySelector('#watched');
const queueBtn = document.querySelector('#queue');
const container = document.getElementById('tui-pagination-container');



let instance = null;
function createPaginationIfRequired(totalFilms) {
  if (instance) return;
  instance = new Pagination(container, {
    totalItems: totalFilms,
    itemsPerPage: 20,
    visiblePages: 10,
    page: 1,
    centerAlign: false,
    usageStatistics: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',

    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn-more tui-{{type}}">' +
        '<span class="tui-ico-{{type}}"></span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}"></span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>'
    }

  });
  instance.on('afterMove', (event) => {
    const currentPage = event.page;
    if (watchedBtn.classList.contains('btn-activ')) {
      renderMoviesList('watched', currentPage);
    }
    else if (queueBtn.classList.contains('btn-activ')) {
      renderMoviesList('queue', currentPage);
    }

  });
};




const genresPromise = theMovieDbAPI.getGenres();

function renderMovies(films, genres) {
  const markup = films
    .map(film => {
      const { id, title, vote_average, poster_path, release_date, genres: filmGenres } = film;

      const filmGenresString = genres
        .filter(genre => filmGenres && filmGenres.some(filmGenre => filmGenre.id === genre.id))
        .map(genre => genre.name)
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
              
                <span class="poster__genres">${filmGenresString}</span>
                <span class="poster__year">${parseInt(release_date)} </span>
                <span class="poster__vote">${vote_average.toFixed(1)}</span>
              </p>
          </div>
          </a>
        </li>
      `;
    })
    .join('');

  filmListElem.innerHTML = markup;
}

export function renderMoviesList(type, page = 1) {

  const films = JSON.parse(localStorage.getItem(type) || '[]');
  page--;
  genresPromise.then(({ data }) => {
    renderMovies(films.slice(page * 20, (page + 1) * 20), data.genres)
  })
  let totalFilms = films.length;
  if (totalFilms > 20) {
    setTimeout(() => {

      createPaginationIfRequired(totalFilms);
    }, 1500);

  } else {
    return;
  }

}


watchedBtn && watchedBtn.addEventListener('click', () => {
  renderMoviesList('watched');
  queueBtn.classList.remove('btn-activ');
  watchedBtn.classList.add('btn-activ');
});
queueBtn && queueBtn.addEventListener('click', () => {
  renderMoviesList('queue');
  watchedBtn.classList.remove('btn-activ');
  queueBtn.classList.add('btn-activ');
});

renderMoviesList('watched')







