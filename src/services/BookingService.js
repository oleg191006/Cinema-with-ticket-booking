const STORAGE_KEY = 'movieBookings';

export class BookingService {
    static saveBooking(movieId, booking) {
        const bookings = this.getBookings();
        const movieBookings = bookings[movieId] || [];

        bookings[movieId] = [...movieBookings, booking];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    }

    static getBookings() {
        const bookings = localStorage.getItem(STORAGE_KEY);
        return bookings ? JSON.parse(bookings) : {};
    }

    static getMovieBookings(movieId) {
        const bookings = this.getBookings();
        return bookings[movieId] || [];
    }

    static getBookedSeats(movieId) {
        const bookings = this.getMovieBookings(movieId);
        return bookings.reduce((seats, booking) => [...seats, ...booking.seats], []);
    }
}