import { useState } from "react";
import MovieCard from "../components/MovieCard";

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
                <p>No favourite movies yet.</p>
            ) : (
                <div className="movie-list">
                    {favourites.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            )}

        </main>
    );
}

export default PageFavourites;