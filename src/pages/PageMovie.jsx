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
    const [error, setError] = useState(null);
    const [isFavourite, setIsFavourite] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/movie/${movieId}?language=en-US&append_to_response=credits,images,videos&include_image_language=en,null`,
                    {
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${API_TOKEN}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Unable to fetch movie details");
                }

                const data = await response.json();

                setMovie(data);
                const savedFavourites =
                    JSON.parse(localStorage.getItem("favourites")) || [];

                const alreadyFavourite = savedFavourites.some(
                    (favourite) => favourite.id === data.id
                );

                setIsFavourite(alreadyFavourite);

            } catch (error) {
                setError(error.message);
            }
        }

        fetchMovie();

    }, [movieId]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!movie) {
        return <p>Loading movie...</p>;
    }

    const rating = Math.round(movie.vote_average * 10);

    const year = movie.release_date
        ? movie.release_date.slice(0, 4)
        : "";

    const director = movie.credits?.crew?.find(
        (person) => person.job === "Director"
    );

    const writers = movie.credits?.crew
        ?.filter(
            (person) =>
                person.job === "Screenplay" ||
                person.job === "Writer"
        )
        .slice(0, 2);

    const cast = movie.credits?.cast?.slice(0, 3);

    const backdrops = movie.images?.backdrops?.slice(0, 2);
    const trailer = movie.videos?.results?.find(
        (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube"
    );

    function handleFavourite() {
        const savedFavourites =
            JSON.parse(localStorage.getItem("favourites")) || [];

        const alreadyFavourite = savedFavourites.some(
            (favourite) => favourite.id === movie.id
        );

        if (alreadyFavourite) {
            const updatedFavourites = savedFavourites.filter(
                (favourite) => favourite.id !== movie.id
            );

            localStorage.setItem(
                "favourites",
                JSON.stringify(updatedFavourites)
            );

            setIsFavourite(false);

        } else {
            const updatedFavourites = [
                    ...savedFavourites,
                    movie
                ];

            localStorage.setItem(
                    "favourites",
                    JSON.stringify(updatedFavourites)
                );

            setIsFavourite(true);
        }
    }

    return (
        <main className="movie-detail">

            <section className="movie-detail__top">

                <div className="movie-detail__poster-wrap">

                    {movie.poster_path ? (
                        <img
                            className="movie-detail__poster"
                            src={`${API_IMAGE_URL}${movie.poster_path}`}
                            alt={`${movie.title} poster`}
                        />
                    ) : (
                        <div className="movie-detail__poster-placeholder">
                            No Poster Available
                        </div>
                    )}

                </div>

                <div className="movie-detail__info">

                    <h1>{movie.title}</h1>

                    <p className="movie-detail__rating">
                        Rating: {rating}/100
                    </p>

                    <p>
                        {year} · {movie.runtime} min ·{" "}
                        {movie.genres
                            .map((genre) => genre.name)
                            .join(", ")}
                    </p>

                    <div className="movie-detail__actions">

                        {trailer && (
                            <button
                                className="movie-detail__trailer"
                                type="button"
                                onClick={() => {
                                    setShowTrailer(!showTrailer);
                                }}
                            >
                                {showTrailer
                                    ? "✕ Close Trailer"
                                    : "▶ Watch Trailer"}
                            </button>
                        )}

                        <button
                            className="movie-detail__favourite"
                            type="button"
                            onClick={handleFavourite}
                        >
                            {isFavourite
                                ? "♥ Remove from Favourites"
                                : "♡ Add to Favourite"}
                        </button>

                    </div>

                    <section className="movie-detail__overview">
                        <h2>Overview</h2>
                        <p>{movie.overview}</p>
                    </section>

                    <section className="movie-detail__credits">

                        {director && (
                            <>
                                <h3>Director</h3>
                                <p>{director.name}</p>
                            </>
                        )}

                        {writers && writers.length > 0 && (
                            <>
                                <h3>Writer</h3>

                                {writers.map((writer) => (
                                    <p key={writer.credit_id}>
                                        {writer.name}
                                    </p>
                                ))}
                            </>
                        )}

                    </section>

                </div>

            </section>


            {showTrailer && trailer && (
                <div className="movie-detail__video">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title={`${movie.title} trailer`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}


            {backdrops && backdrops.length > 0 && (
                <section className="movie-detail__scenes">

                    <h2>Movie Scenes</h2>

                    <div className="movie-detail__gallery">
                        {backdrops.map((image) => (
                            <img
                                key={image.file_path}
                                src={`${API_IMAGE_URL}${image.file_path}`}
                                alt={`${movie.title} scene`}
                            />
                        ))}
                    </div>

                </section>
            )}


            <section className="movie-detail__cast">

                <h2>Top Billed Cast</h2>

                <div className="cast-list">

                    {cast?.map((person) => (
                        <article
                            className="cast-card"
                            key={person.credit_id}
                        >

                            {person.profile_path ? (
                                <img
                                    src={`${API_IMAGE_URL}${person.profile_path}`}
                                    alt={person.name}
                                />
                            ) : (
                                <div className="cast-placeholder">
                                    No Photo
                                </div>
                            )}

                            <h3>{person.name}</h3>

                            <p>{person.character}</p>

                        </article>
                    ))}

                </div>

            </section>

        </main>
    );
}

export default PageMovie;