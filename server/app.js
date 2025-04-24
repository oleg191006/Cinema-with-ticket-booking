import express from 'express'
import cors from 'cors'
import movieRoutes from './routes/movies.js'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/movies', movieRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
