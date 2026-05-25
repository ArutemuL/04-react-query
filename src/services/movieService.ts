import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

const myKey = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

async function fetchMovies(
  query: string,
  page: number
): Promise<FetchMoviesResponse> {
  const response = await axios.get<FetchMoviesResponse>(BASE_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  const { results, total_pages } = response.data;
  return { results: results, total_pages: total_pages };
}

export default fetchMovies;