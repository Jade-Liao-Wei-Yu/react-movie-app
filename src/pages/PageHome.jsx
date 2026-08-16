import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import {
    API_BASE_URL,
    API_TOKEN
} from "../globals/globalVariables";

function PageHome() {
    const [movies, setMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [moviesPerPage, setMoviesPerPage] = useState(2);
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

    useEffect(() => {
    const tabletMedia = window.matchMedia("(min-width: 48em)");
    const desktopMedia = window.matchMedia("(min-width: 64em)");

    function updateMoviesPerPage() {
        if (desktopMedia.matches) {
            setMoviesPerPage(4);
        } else if (tabletMedia.matches) {
            setMoviesPerPage(3);
        } else {
            setMoviesPerPage(2);
        }

        setPopularStart(0);
        setTopRatedStart(0);
    }

    updateMoviesPerPage();

    tabletMedia.addEventListener("change", updateMoviesPerPage);
    desktopMedia.addEventListener("change", updateMoviesPerPage);

    return () => {
        tabletMedia.removeEventListener(
            "change",
            updateMoviesPerPage
        );

        desktopMedia.removeEventListener(
            "change",
            updateMoviesPerPage
        );
    };
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
        popularStart + moviesPerPage
    );
   
    const visibleTopRatedMovies = topRatedMovies.slice(
        topRatedStart,
        topRatedStart + moviesPerPage
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
                                setPopularStart(
                            Math.max(0, popularStart - moviesPerPage)
                        );
                            }}
                            aria-label="Previous movies"
                        >
                            ←
                        </button>
                    )}

                    {popularStart + moviesPerPage < popularMovies.length && (
                        <button
                            className="movie-section__arrow"
                            type="button"
                            onClick={() => {
                                setPopularStart(popularStart + moviesPerPage);
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
                                setTopRatedStart(
                                    Math.max(0, topRatedStart - moviesPerPage)
                                );
                            }}
                            aria-label="Previous top rated movies"
                        >
                            ←
                        </button>
                    )}

                    {topRatedStart + moviesPerPage < topRatedMovies.length && (
                        <button
                            className="movie-section__arrow"
                            type="button"
                            onClick={() => {
                                setTopRatedStart(topRatedStart + moviesPerPage);
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