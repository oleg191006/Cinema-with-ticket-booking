import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Film } from "lucide-react";
import Home from "./pages/home/Home";
import Booking from "./pages/booking/Booking";
import styles from "./App.module.css";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Film className={styles.logo} />
            <h1 className={styles.title}>Movie Showcase</h1>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking/:id" element={<Booking />} />
          </Routes>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>© 2025 Movie Showcase. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
