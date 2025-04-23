import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movies } from "../data/movies";
import CinemaHall from "../components/CinemaHall";
import styles from "./Booking.module.css";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === parseInt(id));
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!movie) {
    return (
      <div className={styles.error}>
        <h2>Movie not found</h2>
        <button onClick={() => navigate("/")} className={styles.backButton}>
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.showtime}>
          Showtime: {new Date(movie.showtime).toLocaleString()}
        </p>
      </div>

      <CinemaHall
        selectedSeats={selectedSeats}
        onSeatSelect={setSelectedSeats}
      />

      <div className={styles.summary}>
        <h3>Selected Seats: {selectedSeats.length}</h3>
        <p>Total: ${selectedSeats.length * 10}</p>
        <button
          className={styles.bookButton}
          disabled={selectedSeats.length === 0}
          onClick={() => alert("Booking completed!")}
        >
          Complete Booking
        </button>
      </div>
    </div>
  );
};

export default Booking;
