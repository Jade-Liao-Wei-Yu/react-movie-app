import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    return (
        <article>
            <img
                src={movie.poster}
                alt={`${movie.title} poster`}
            />

            <h2>{movie.title}</h2>
            <p>Rating: {movie.rating}</p>

            <Link to={`/movie/${movie.id}`}>
                View Details
            </Link>
        </article>
    );
}

export default MovieCard;