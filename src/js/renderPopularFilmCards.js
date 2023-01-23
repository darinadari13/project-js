import debounce from 'lodash.debounce';
import { TheMovieDbAPI } from './theMovieDbAPI';
import Pagination from 'tui-pagination';

const theMovieDbAPI = new TheMovieDbAPI();

const filmListElem = document.querySelector('.films-list');
const container = document.getElementById('tui-pagination-container');




let instance = null;
function createPaginationIfRequired(totalItems) {
  if (instance) return;
  instance = new Pagination(container, {
    totalItems: totalItems,
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
    renderPopularFilmCards(currentPage);
  });
};

let genresArr = [];

export async function renderGenresArr(response) {
  try {
    const {
      data: { genres },
    } = await theMovieDbAPI.getGenres(response);
    genresArr = [...genres];
  } catch (err) { }
}

renderGenresArr();

export async function renderPopularFilmCards(pageInitialNumber = 1) {
  try {
    const {
      data: { results: filmArr, total_results },
    } = await theMovieDbAPI.getPopularFilms(pageInitialNumber);
    createPaginationIfRequired(total_results);
    renderMarkup(filmArr);

  } catch (err) {
    console.log(err);
  }
}


export function renderMarkup(arr) {

  const markup = arr
    .map(film => {
      const { id, title, poster_path, release_date, genre_ids } = film;

      const newArr = [];
      for (const el of genresArr) {
        if (genre_ids.includes(el.id)) {
          newArr.push(el.name);
        }
      }
      const filmGenres = newArr.join(', ');

      return `<li class="films-list__item poster">
          <a href="#" class="films-list__link" data-movie-id="${id}">
            <div class="films-list__image-wrapper">
              <img
                width="280"
                height="420"
                alt="poster of ${TheMovieDbAPI.IMG_URL + poster_path} movie"
                class="films-list__image lazyload"
                src="${TheMovieDbAPI.IMG_URL + poster_path}"
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
        </li>`;
      
      
      
      
    })
    .join('');  
  

  setTimeout(() => {
    filmListElem.innerHTML = markup;
  }, 500);
}

renderPopularFilmCards();