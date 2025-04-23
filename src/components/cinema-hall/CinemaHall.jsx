import styles from "./CinemaHall.module.css";

const ROWS = 8;
const SEATS_PER_ROW = 12;

const CinemaHall = ({ selectedSeats, onSeatSelect }) => {
  const isSeatSelected = (seatId) => selectedSeats.includes(seatId);
  const isSeatTaken = (seatId) => {
    // Simulate some seats being taken
    const takenSeats = [1, 15, 28, 42, 56, 73, 89];
    return takenSeats.includes(seatId);
  };

  const handleSeatClick = (seatId) => {
    if (isSeatTaken(seatId)) return;

    if (isSeatSelected(seatId)) {
      onSeatSelect(selectedSeats.filter((id) => id !== seatId));
    } else {
      onSeatSelect([...selectedSeats, seatId]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.screen}>Screen</div>

      <div className={styles.hall}>
        {Array.from({ length: ROWS }, (_, row) => (
          <div key={row} className={styles.row}>
            <span className={styles.rowLabel}>
              {String.fromCharCode(65 + row)}
            </span>
            {Array.from({ length: SEATS_PER_ROW }, (_, seat) => {
              const seatId = row * SEATS_PER_ROW + seat + 1;
              const seatClass = `${styles.seat} ${
                isSeatSelected(seatId) ? styles.selected : ""
              } ${isSeatTaken(seatId) ? styles.taken : ""}`;

              return (
                <button
                  key={seat}
                  className={seatClass}
                  onClick={() => handleSeatClick(seatId)}
                  disabled={isSeatTaken(seatId)}
                >
                  {seat + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.seat}`}></div>
          <span>Available</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.seat} ${styles.selected}`}></div>
          <span>Selected</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.seat} ${styles.taken}`}></div>
          <span>Taken</span>
        </div>
      </div>
    </div>
  );
};

export default CinemaHall;
