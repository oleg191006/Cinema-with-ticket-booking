import { Film } from "lucide-react";
import MovieList from "./components/movie-list/MovieList";
import { movies } from "./data/movies";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Film className={styles.logo} />
          <h1 className={styles.title}>Movie Showcase</h1>
        </div>
      </header>

      <main>
        <MovieList movies={movies} />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2025 Movie Showcase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
