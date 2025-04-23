import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import MovieCard from "../movie-card/MovieCard";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(results);
  }, [searchTerm, movies]);

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <Search className={styles.searchIcon} size={18} />
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <div className={styles.noResults}>
          <h3>No movies found matching "{searchTerm}"</h3>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
