import styles from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const PLACEHOLDER = "/public/placeholder.svg";

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  if (!movies.length) return null;

  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div className={styles.card} onClick={() => onSelect(movie)}>
            <img
              className={styles.image}
              src={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${movie.poster_path}`
                  : PLACEHOLDER
              }
              alt={movie.title}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = PLACEHOLDER;
              }}
            />
            <h2 className={styles.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;