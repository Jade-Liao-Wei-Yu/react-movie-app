import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import {
    API_BASE_URL,
    API_TOKEN
} from "../globals/globalVariables";

function PageHome() {
    const [movies, setMovies] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("popular");

    const [heroTrailer, setHeroTrailer] = useState(null);
    const [showHeroTrailer, setShowHeroTrailer] = useState(false);

    const [moviesPerPage, setMoviesPerPage] = useState(2);
    const [movieStart, setMovieStart] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Fetch movies whenever the category changes
    useEffect(() => {
        async function fetchMovies() {
            try {
                setError(null);

                const response = await fetch(
                    `${API_BASE_URL}/movie/${selectedCategory}?language=en-US&page=1`,
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

                // Return carousel to the first group
                setMovieStart(0);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }

        fetchMovies();

    }, [selectedCategory]);


    // Fetch trailer for the first movie in the current category
    useEffect(() => {
        async function fetchHeroTrailer() {
            const heroMovie = movies[0];

            if (!heroMovie) {
                setHeroTrailer(null);
                return;
            }

            try {
                const response = await fetch(
                    `${API_BASE_URL}/movie/${heroMovie.id}/videos?language=en-US`,
                    {
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${API_TOKEN}`
                        }
                    }
                );

                if (!response.ok) {
                    setHeroTrailer(null);
                    return;
                }

                const data = await response.json();

                const trailer =
                    data.results.find(
                        (video) =>
                            video.site === "YouTube" &&
                            video.type === "Trailer"
                    ) ||
                    data.results.find(
                        (video) =>
                            video.site === "YouTube"
                    );

                setHeroTrailer(trailer || null);
                setShowHeroTrailer(false);

            } catch {
                setHeroTrailer(null);
            }
        }

        fetchHeroTrailer();

    }, [movies]);


    // Mobile First:
    // Mobile = 2
    // Tablet = 3
    // Desktop = 4
    useEffect(() => {
        const tabletMedia =
            window.matchMedia("(min-width: 48em)");

        const desktopMedia =
            window.matchMedia("(min-width: 64em)");

        function updateMoviesPerPage() {
            if (desktopMedia.matches) {
                setMoviesPerPage(4);
            } else if (tabletMedia.matches) {
                setMoviesPerPage(3);
            } else {
                setMoviesPerPage(2);
            }

            setMovieStart(0);
        }

        updateMoviesPerPage();

        tabletMedia.addEventListener(
            "change",
            updateMoviesPerPage
        );

        desktopMedia.addEventListener(
            "change",
            updateMoviesPerPage
        );

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

    const visibleMovies = movies.slice(
        movieStart,
        movieStart + moviesPerPage
    );


    const categoryNames = {
        popular: "Popular",
        top_rated: "Top Rated",
        now_playing: "Now Playing",
        upcoming: "Upcoming"
    };


    return (
        <main className="home">

            {/* Hero */}
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

                            <Link to={`/movie/${heroMovie.id}`}>
                                Detail
                            </Link>

                            {heroTrailer && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowHeroTrailer(
                                            !showHeroTrailer
                                        );
                                    }}
                                >
                                    {showHeroTrailer
                                        ? "Close Trailer"
                                        : "Watch Trailer"}
                                </button>
                            )}

                        </div>

                    </div>
                </section>
            )}


            {/* Embedded Trailer */}
            {showHeroTrailer && heroTrailer && (
                <div className="hero-trailer">

                    <iframe
                        src={`https://www.youtube.com/embed/${heroTrailer.key}`}
                        title={`${heroMovie.title} trailer`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>

                </div>
            )}


            {/* Movie category controls */}
            <section className="movie-section">

                <h2>
                    {categoryNames[selectedCategory]}
                </h2>

                <div className="movie-filter">

                    <button
                        type="button"
                        aria-pressed={selectedCategory === "popular"}
                        onClick={() => setSelectedCategory("popular")}
                    >
                        Popular
                    </button>

                    <button
                        type="button"
                        aria-pressed={selectedCategory === "top_rated"}
                        onClick={() => setSelectedCategory("top_rated")}
                    >
                        Top Rated
                    </button>

                    <button
                        type="button"
                        aria-pressed={selectedCategory === "now_playing"}
                        onClick={() => setSelectedCategory("now_playing")}
                    >
                        Now Playing
                    </button>

                    <button
                        type="button"
                        aria-pressed={selectedCategory === "upcoming"}
                        onClick={() => setSelectedCategory("upcoming")}
                    >
                        Upcoming
                    </button>

                </div>


                {/* One movie list */}
                <div className="movie-list">

                    {visibleMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}

                </div>


                {/* Carousel arrows */}
                <div className="movie-section__arrows">

                    {movieStart > 0 && (
                        <button
                            className="movie-section__arrow"
                            type="button"
                            onClick={() => {
                                setMovieStart(
                                    Math.max(
                                        0,
                                        movieStart - moviesPerPage
                                    )
                                );
                            }}
                            aria-label="Previous movies"
                        >
                            ←
                        </button>
                    )}


                    {movieStart + moviesPerPage < movies.length && (
                        <button
                            className="movie-section__arrow"
                            type="button"
                            onClick={() => {
                                setMovieStart(
                                    movieStart + moviesPerPage
                                );
                            }}
                            aria-label="Next movies"
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