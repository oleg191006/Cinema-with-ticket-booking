import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { movies } from "../../data/movies";
import { BookingService } from "../../services/BookingService";
import CinemaHall from "../../components/cinema-hall/CinemaHall";
import styles from "./Booking.module.css";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === parseInt(id));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movie) {
      const booked = BookingService.getBookedSeats(movie.id);
      setBookedSeats(booked);
    }
  }, [movie]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBooking = () => {
    if (validateForm()) {
      const booking = {
        ...formData,
        seats: selectedSeats,
        date: new Date().toISOString(),
      };

      BookingService.saveBooking(movie.id, booking);
      toast.success("Booking completed successfully!");
      setShowForm(false);
      setSelectedSeats([]);
      const booked = BookingService.getBookedSeats(movie.id);
      setBookedSeats(booked);
    }
  };

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
        <button onClick={() => navigate("/")} className={styles.backButton}>
          ← Back to Movies
        </button>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.showtime}>
          Showtime: {new Date(movie.showtime).toLocaleString()}
        </p>
      </div>

      <CinemaHall
        selectedSeats={selectedSeats}
        bookedSeats={bookedSeats}
        onSeatSelect={setSelectedSeats}
      />

      {!showForm ? (
        <div className={styles.summary}>
          <h3>Selected Seats: {selectedSeats.length}</h3>
          <p>Total: ${selectedSeats.length * 10}</p>
          <button
            className={styles.bookButton}
            disabled={selectedSeats.length === 0}
            onClick={() => setShowForm(true)}
          >
            Proceed to Booking
          </button>
        </div>
      ) : (
        <div className={styles.bookingForm}>
          <h3>Booking Details</h3>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? styles.error : ""}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className={errors.phone ? styles.error : ""}
            />
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? styles.error : ""}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>
          <div className={styles.formActions}>
            <button
              className={styles.cancelButton}
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button className={styles.bookButton} onClick={handleBooking}>
              Complete Booking
            </button>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Booking;
