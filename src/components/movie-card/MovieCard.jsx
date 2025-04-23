import { Calendar, Clock, Film } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const formatShowtime = (showtime) => {
    const date = new Date(showtime);
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { date, time } = formatShowtime(movie.showtime);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          className={styles.image}
        />
        <div className={styles.genre}>
          <span>{movie.genre}</span>
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.description}>{movie.description}</p>

        <div className={styles.metaInfo}>
          <div className={styles.metaItem}>
            <Calendar className={styles.icon} />
            <span>{date}</span>
          </div>
          <div className={styles.metaItem}>
            <Clock className={styles.icon} />
            <span>{time}</span>
          </div>
          <div className={styles.metaItem}>
            <Film className={styles.icon} />
            <span>{movie.genre}</span>
          </div>
        </div>

        <button
          className={styles.bookButton}
          onClick={() => navigate(`/booking/${movie.id}`)}
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
