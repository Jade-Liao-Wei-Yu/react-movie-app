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
            try {
                const response = await fetch(
                    `${API_BASE_URL}/movie/popular?language=en-US&page=1`,
                    {
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${API_TOKEN}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Unable to fetch movies");
                }

                const data = await response.json();

                setMovies(data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();

    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const heroMovie = movies[0];
    const popularMovies = movies.slice(0, 4);
    const topRatedMovies = movies.slice(4, 8);

    return (
        <main className="home">

            <section className="home-search">
                <input
                    type="search"
                    placeholder="Search..."
                    aria-label="Search movies"
                />
            </section>

            {heroMovie && (
                <section
                    className="hero-banner"
                    style={{
                        backgroundImage: `url(
                            https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}
                        )`
                    }}
                >
                    <div className="hero-banner__content">
                        <h1>{heroMovie.title}</h1>

                        <p>
                            {heroMovie.overview}
                        </p>

                        <div className="hero-banner__buttons">
                            <a href={`/movie/${heroMovie.id}`}>
                                Detail
                            </a>

                            <button type="button">
                                Watch Trailer
                            </button>
                        </div>
                    </div>
                </section>
            )}

            <section className="movie-section">
                <h2>Popular</h2>

                <div className="movie-list">
                    {popularMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>

                <div className="movie-section__arrow">
                    →
                </div>
            </section>

            <section className="movie-section">
                <h2>Top Rated</h2>

                <div className="movie-list">
                    {topRatedMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>

                <div className="movie-section__arrow">
                    →
                </div>
            </section>

        </main>
    );
}

export default PageHome;