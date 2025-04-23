import MovieList from "./components/movie-list/MovieList";
import { movies } from "./data/movies";

function App() {
  return (
    <>
      <MovieList movies={movies} />
    </>
  );
}

export default App;
