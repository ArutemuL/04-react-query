import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMpviesResponse {
  result: Movie[];
  totalPage: number;
}

const myKey = import.meta.env.VITE_API_KEY;
const BASE_URl = "https://api.themoviedb.org/3/search/movie";

async function fetchMovies(
  query: string,
  page: number
): Promise<FetchMpviesResponse> {
  const response = await axios.get(BASE_URl, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  const { results, total_pages } = response.data;
  return { result: results, totalPage: total_pages };
}

export default fetchMovies;