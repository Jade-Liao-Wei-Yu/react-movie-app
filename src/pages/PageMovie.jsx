import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    API_BASE_URL,
    API_IMAGE_URL,
    API_TOKEN
} from "../globals/globalVariables";

function PageMovie() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    useEffect(() => {
        async function fetchMovie() {
            const response = await fetch(
                `${API_BASE_URL}/movie/${movieId}?language=en-US`,
                {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${API_TOKEN}`
                    }
                }
            );

            const data = await response.json();

            setMovie(data);
        }

        fetchMovie();

    }, [movieId]);

    if (!movie) {
        return <p>Loading movie...</p>;
    }

    return (
        <>
            <h1>{movie.title}</h1>

            <img
                src={`${API_IMAGE_URL}${movie.poster_path}`}
                alt={`${movie.title} poster`}
            />

            <p>{movie.overview}</p>

            <p>Rating: {movie.vote_average.toFixed(1)}</p>

            <p>Release Date: {movie.release_date}</p>

            <p>Runtime: {movie.runtime} minutes</p>

            <p>
                Genres: {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
        </>
    );
}

export default PageMovie;