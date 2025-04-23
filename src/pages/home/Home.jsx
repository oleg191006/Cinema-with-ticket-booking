import React from "react";
import MovieList from "../../components/movie-list/MovieList";
import { movies } from "../../data/movies";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
