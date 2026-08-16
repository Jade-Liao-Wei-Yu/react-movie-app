import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import {
    API_BASE_URL,
    API_TOKEN
} from "../globals/globalVariables";

function PageHome() {
    const [movies, setMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularStart, setPopularStart] = useState(0);
    const [topRatedStart, setTopRatedStart] = useState(0);
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

        async function fetchTopRatedMovies() {
            const response = await fetch(
                `${API_BASE_URL}/movie/top_rated?language=en-US&page=1`,
                {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${API_TOKEN}`
                    }
                }
            );

            const data = await response.json();

            setTopRatedMovies(data.results);
        }
        fetchTopRatedMovies();


    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const heroMovie = movies[0];
    const popularMovies = movies.slice(0, 8);

    const visiblePopularMovies = popularMovies.slice(
        popularStart,
        popularStart + 2
    );
   
    const visibleTopRatedMovies = topRatedMovies.slice(
        topRatedStart,
        topRatedStart + 2
    );

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
                    {visiblePopularMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>

                <div className="movie-section__arrows">

                    {popularStart > 0 && (
                        <button
                            className="movie-section__arrow"
                            type="button"
                            onClick={() => {
                                setPopularStart(popularStart - 2);
                            }}
                            aria-label="Previous movies"
                        >
                            ←
                        </button>
                    )}

                    {popularStart + 2 < popularMovies.length && (
                        <button
                            className="movie-section__arrow"
                            type="button"
                            onClick={() => {
                                setPopularStart(popularStart + 2);
                            }}
                            aria-label="Next movies"
                        >
                            →
                        </button>
                    )}

                </div>
            </section>

            <section className="movie-section">
                <h2>Top Rated</h2>

                <div className="movie-list">
                    {visibleTopRatedMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>

                <div className="movie-section__arrows">

                    {topRatedStart > 0 && (
                        <button
                            className="movie-section__arrow"
                            type="button"
                            onClick={() => {
                                setTopRatedStart(topRatedStart - 2);
                            }}
                            aria-label="Previous top rated movies"
                        >
                            ←
                        </button>
                    )}

                    {topRatedStart + 2 < topRatedMovies.length && (
                        <button
                            className="movie-section__arrow"
                            type="button"
                            onClick={() => {
                                setTopRatedStart(topRatedStart + 2);
                            }}
                            aria-label="Next top rated movies"
                        >
                            →
                        </button>
                    )}

                </div>
            </section>

        </main>
    );
}

export default PageHome;