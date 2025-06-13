export interface TMovie {
    id: number;
    title:string;
    name: string;
    original_name: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    number_of_seasons: number;
    first_air_date: string;
    genres: { id: number; name: string }[];
  }
  
  export interface TMovieListResult {
    page: number;
    results: TMovie[];
    total_pages: number;
    total_results: number;
  }
  
  export interface TMovieListItem {
    slug: string;
    title: string;
    items: TMovieListResult;
  }

  export interface IMovieListResult {
    page: number;
    results: TMovie[];
    total_pages: number;
    total_results: number;
  }  
  export interface TMovieListItemsResponse {
    page: number;
    results: TMovie[];
    total_pages: number;
    total_results: number;
  }
  
  export interface TMovieListItem {
    slug: string;
    title: string;
    items: TMovieListItemsResponse;
  }
  
  