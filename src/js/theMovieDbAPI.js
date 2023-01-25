import axios from 'axios';
import { startSpin, stopSpin } from './preloaderBtn';

export class TheMovieDbAPI {
  static BASE_URL = 'https://api.themoviedb.org/3';
  static API_KEY = '1deae1a36202e3ac8c29219a3d453e0f';
  static IMG_URL = 'https://image.tmdb.org/t/p/w500';
  static YOUTUBE_URL = 'https://www.youtube.com/embed/';

  constructor() {
    this.page = 1;
    this.query = null;
    this.per_page = 20;
  }

  async getPopularFilms(pageNumber) {
    startSpin();
    this.page = pageNumber;
    const response = await axios.get(
      `${TheMovieDbAPI.BASE_URL}/trending/movie/week`,
      {
        params: {
          api_key: TheMovieDbAPI.API_KEY,
          page: this.page,
        },
      }
    );
    // stopSpin();
    return response;
  }

  async getGenres() {
    const response = await axios.get(
      `${TheMovieDbAPI.BASE_URL}/genre/movie/list`,
      {
        params: {
          api_key: TheMovieDbAPI.API_KEY,
        },
      }
    );
    return response;
  }

  async fetchUniqFilms(query) {
    startSpin();
    const searchParams = {
      params: {
        language: 'en-US',
        page: this.page,
        query: this.query,
        api_key: TheMovieDbAPI.API_KEY,
      },
    };

    const response = await axios.get(
      `${TheMovieDbAPI.BASE_URL}/search/movie`,
      searchParams
    );
    // stopSpin();
    return response;
    // https://api.themoviedb.org/3/search/movie?api_key=1deae1a36202e3ac8c29219a3d453e0f&language=en-US&page=1&query=love
  }

  async getMovieInfoById(id) {
    const response = await axios.get(`${TheMovieDbAPI.BASE_URL}/movie/${id}?`, {
      params: {
        api_key: TheMovieDbAPI.API_KEY,
      },
    });

    return response;
  }
  async getMovieTrailerById(id) {
    const response = await axios.get(
      `${TheMovieDbAPI.BASE_URL}/movie/${id}/videos`,
      {
        params: {
          api_key: TheMovieDbAPI.API_KEY,
        },
      }
    );

    return response;
  }
}
