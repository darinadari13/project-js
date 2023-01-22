import axios from 'axios';

export class TheMovieDbAPI {
  static BASE_URL = 'https://api.themoviedb.org/3';
  static API_KEY = 'api_key=1deae1a36202e3ac8c29219a3d453e0f';
  static IMG_URL = 'https://image.tmdb.org/t/p/w500';

  constructor() {
    this.page = 1;
    this.query = null;
    this.per_page = 20;
  }

  async getPopularFilms() {
    const response = await axios.get(
      `${TheMovieDbAPI.BASE_URL}/trending/movie/week?${TheMovieDbAPI.API_KEY}`
    );
    return response;
  }

  async getGenres() {
    const response = await axios.get(
      `${TheMovieDbAPI.BASE_URL}/genre/movie/list?${TheMovieDbAPI.API_KEY}`
    );
    return response;
  }

  async fetchUniqFilms(query) {
    const searchParams = {
      params: {
        language: 'en-US',
        page: this.page,
        query: this.query,
      },
    };

    const response = await axios.get(
      `${TheMovieDbAPI.BASE_URL}/search/movie?${TheMovieDbAPI.API_KEY}`,
      searchParams
    );

    return response;
    // https://api.themoviedb.org/3/search/movie?api_key=1deae1a36202e3ac8c29219a3d453e0f&language=en-US&page=1&query=love
  }

  async getMovieInfoById(id) {
    const response = await axios.get(
      `${TheMovieDbAPI.BASE_URL}/movie/${id}?${TheMovieDbAPI.API_KEY}`
    );
    return response;
  }
}
