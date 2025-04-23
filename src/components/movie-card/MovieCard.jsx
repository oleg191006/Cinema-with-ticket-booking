import { Calendar, Clock, Film } from "lucide-react";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
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
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className={styles.metaItem}>
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
          <div className={styles.metaItem}>
            <Film className="w-4 h-4" />
            <span>{movie.genre}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
