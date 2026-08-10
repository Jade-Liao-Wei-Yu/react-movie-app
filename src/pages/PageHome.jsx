import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import {
    API_BASE_URL,
    API_TOKEN
} from "../globals/globalVariables";

function PageHome() {
    const [movies, setMovies] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);
    
   useEffect(() => {
        async function fetchMovies() {

            const response = await fetch(
                `${API_BASE_URL}/movie/popular?language=en-US&page=1`,
                {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${API_TOKEN}`
                    }
                }
            );

            const data = await response.json();

            setMovies(data.results);
            setLoading(false);
        }

        fetchMovies();

    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <h1>Home Page</h1>

            <div className="movie-list">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </div>
        </>
    );
}

export default PageHome;