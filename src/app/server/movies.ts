
import { TMovie, TMovieListItem } from "../types/IMovies";
const API_KEY = '1fc2a9de1e65544b244facd066e1bfd1';
const API_BASE = 'https://api.themoviedb.org/3';

/*
* Função auxiliar para fazer requisições à API
*/
export const basicFetch = async (endpoint: string): Promise<any> => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
}

export const Movies = {
  getHomeList: async (): Promise<TMovieListItem[]> => {
    return [
      {
        slug: 'originals',
        title: 'Originais da Netflix',
        items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'trending',
        title: 'Recomendados para Você',
        items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'toprated',
        title: 'Em Alta',
        items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
      }
    ];
  },
  getMovieInfo: async (movieId: number, type: 'movie' | 'tv'): Promise<TMovie> => {
      let info = {};
      if(movieId){
          switch(type){
              case 'movie':
                  info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
              break;
              case 'tv':
                   info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
              break;
              default:
                  info = {};
              break;
          }
      }
      return info as TMovie;
  }
};
