function PageAbout() {
    return (
        <main className="about-page">

            <h1>About Movie App</h1>

            <p>
                Movie App is a React application that allows users
                to browse popular, top-rated, now-playing, and upcoming
                movies, view movie details and trailers, and save
                favourite movies.
            </p>

            <section className="about-tmdb">

                <h2>Movie Data</h2>

                <img
                    src={`${import.meta.env.BASE_URL}tmdb-logo.svg`}
                    alt="The Movie Database (TMDb) logo"
                    className="tmdb-logo"
                />

                <p>
                    This product uses the TMDb API but is not endorsed
                    or certified by TMDb.
                </p>

            </section>

        </main>
    );
}

export default PageAbout;