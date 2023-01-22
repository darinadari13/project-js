import debounce from 'lodash.debounce';
import { TheMovieDbAPI } from './theMovieDbAPI';

const theMovieDbAPI = new TheMovieDbAPI();

const filmListElem = document.querySelector('.films-list');

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

// export async function renderPopularFilmCards(response) {
//   try {
//     const {
//       data: { results: filmArr },
//     } = await theMovieDbAPI.getPopularFilms(response);

//     const markup = filmArr
//       .map(film => {
//         const { id, title, poster_path, release_date, genre_ids } = film;

//         const newArr = [];
//         for (const el of genresArr) {
//           if (genre_ids.includes(el.id)) {
//             newArr.push(el.name);
//           }
//         }
//         const filmGenres = newArr.join(', ');

//         return `<li class="films-list__item poster">
//           <a href="#" class="films-list__link" id ="${id}">
//             <div class="films-list__image-wrapper">
//               <img
//                 width="280"
//                 height="420"
//                 src="${TheMovieDbAPI.IMG_URL + poster_path}"
//                 alt="poster of ${TheMovieDbAPI.IMG_URL + poster_path} movie"
//                 class="films-list__image"
//               />
//             </div>
// 				<div class="poster__info">
//             <h2 class="poster__title">${title.toUpperCase()}</h2>
//             <p class="poster__genre">
// 				<span class="poster__genres">${filmGenres}</span>
//               <span class="poster__year">${parseInt(release_date)} </span>
//             </p>
// 				</div>
//           </a>
//         </li>`;
//       })
//       .join('');
//     filmListElem.insertAdjacentHTML('beforeend', markup);
//   } catch (err) {
//     console.log(err);
//   }
// }

// renderPopularFilmCards();

export async function renderPopularFilmCards(response) {
  try {
    const {
      data: { results: filmArr },
    } = await theMovieDbAPI.getPopularFilms(response);
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
        </li>`;
    })
    .join('');

  setTimeout(() => {
    filmListElem.innerHTML = markup;
  }, 200);
}

renderPopularFilmCards();