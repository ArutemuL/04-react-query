import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  async function handkeSearch(newQuery: string) {
    setQuery(newQuery);
    setPage(1);
  }

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.result.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data]);
  const totalPages = data?.totalPage;

  return (
    <>
      <Toaster position="top-center" />

      <SearchBar onSubmit={handkeSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {isSuccess && totalPages !== undefined && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          previousLabel={
            page === 1 ? (
              <span className={css.disabled}>←</span>
            ) : (
              <span>←</span>
            )
          }
          nextLabel={
            page === totalPages ? (
              <span className={css.disabled}>→</span>
            ) : (
              <span>→</span>
            )
          }
        />
      )}

      {data && <MovieGrid movies={data.result} onSelect={setSelectedMovie} />}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default App;