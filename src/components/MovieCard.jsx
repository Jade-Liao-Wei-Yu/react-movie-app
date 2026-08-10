import { Link } from "react-router-dom";
import { API_IMAGE_URL } from "../globals/globalVariables";

function MovieCard({ movie }) {
    const year = movie.release_date
        ? movie.release_date.slice(0, 4)
        : "";

    const rating = Math.round(movie.vote_average * 10);

    return (
        <article className="movie-card">

            <img
                src={`${API_IMAGE_URL}${movie.poster_path}`}
                alt={`${movie.title} poster`}
            />

            <div className="movie-card__info">

                <div className="movie-card__top">
                    <h3>{movie.title}</h3>

                    <strong>
                        {rating}/100
                    </strong>
                </div>

                <div className="movie-card__bottom">
                    <span>{year}</span>

                    <Link to={`/movie/${movie.id}`}>
                        Details
                    </Link>
                </div>

            </div>

        </article>
    );
}

export default MovieCard;