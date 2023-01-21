const API_KEY = 'api_key=1deae1a36202e3ac8c29219a3d453e0f';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';



// const main = document.getElementById('main')
// getMovies(API_URL);


// function getMovies(url) {
//   fetch(url).then(res => res.json()).then(data => {
//     console.log(data.results);

//     showMovies(data.results);
//   })

// }

// function showMovies(data) {
//   main.innerHTML = '';
//   data.forEach(movie => {
//     const { title, poster_path, name, overview, id, release_date } = movie;
//     const movieEl = document.createElement('div');
//     movieEl.classList.add('movie');
//     movieEl.innerHTML = `
//              <img src="${IMG_URL + poster_path}" alt="${title}">
//             <div class="movie-info">
//                 <h3>${title}</h3>
//                 <span class="${(name)}">${name} | ${release_date.slice(0, 4)
//       } </span>  
         
//         `
//     main.appendChild(movieEl);
//   })
// }




// const apiKey = '1deae1a36202e3ac8c29219a3d453e0f';
// const movieId = 100;

// /**
//  * Fetch movie data from themoviedb.org
//  * @param {number} id    Movie id
//  * @return {object}      Movie object
//  */
// async function fetchMovie(id) {
//     const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
//     const movie = await response.json();
//     return movie;
// }


// fetchMovie(movieId).then(movie => {
//     movie.genres.forEach(genre => {
//         console.log("genre id: " + genre.id + ", genre name: " + genre.name); // output genre and id
//     })
// });