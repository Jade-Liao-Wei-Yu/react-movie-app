import { API_IMAGE_URL } from "../globals/globalVariables";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    return (
        <article className="movie-card">
            <img
                src={`${API_IMAGE_URL}${movie.poster_path}`}
                alt={`${movie.title} poster`}
            />

            <h2>{movie.title}</h2>
            <p>Rating: {movie.vote_average.toFixed(1)}</p>

            <Link to={`/movie/${movie.id}`}>
                View Details
            </Link>
        </article>
    );
}

export default MovieCard;