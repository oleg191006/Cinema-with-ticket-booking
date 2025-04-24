
import { movies } from '../data/movies.js'

export const getAllMovies = (req, res) => {
    res.json(movies);
};

export const getMovieById = (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
};
