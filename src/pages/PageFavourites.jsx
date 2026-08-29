import { useState } from "react";
import { Link } from "react-router-dom";
import { API_IMAGE_URL } from "../globals/globalVariables";

function PageFavourites() {
    const [favourites] = useState(() => {
        return JSON.parse(
            localStorage.getItem("favourites")
        ) || [];
    });

    return (
        <main className="favourites-page">

            <h1>Favourites</h1>

            {favourites.length === 0 ? (
                <div className="favourites-empty">
                    <p>
                        Sorry, you have no favourite movies.
                    </p>

                    <Link to="/">
                        Return to the Home page to add a favourite movie.
                    </Link>
                </div>
            ) : (
                <div className="favourites-list">

                    {favourites.map((movie) => (
                        <article
                            className="favourite-card"
                            key={movie.id}
                        >

                            {movie.poster_path ? (
                                <img
                                    src={`${API_IMAGE_URL}${movie.poster_path}`}
                                    alt={`${movie.title} poster`}
                                />
                            ) : (
                                <div className="poster-placeholder">
                                    No Poster Available
                                </div>
                            )}

                            <div className="favourite-card__content">

                                <h2>{movie.title}</h2>

                                <p>
                                    Rating:{" "}
                                    {Math.round(movie.vote_average * 10)}/100
                                </p>

                                <p>
                                    Release Date:{" "}
                                    {movie.release_date || "Unknown"}
                                </p>

                                <p className="favourite-card__overview">
                                    {movie.overview
                                        ? movie.overview
                                        : "No plot summary available."}
                                </p>

                                <Link to={`/movie/${movie.id}`}>
                                    More Info
                                </Link>

                            </div>

                        </article>
                    ))}

                </div>
            )}

        </main>
    );
}

export default PageFavourites;