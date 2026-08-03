import MovieCard from "../components/MovieCard";

function PageHome() {
    const movies = [
        {
            id: 123,
            title: "Sample Movie One",
            rating: 8.5
        },
        {
            id: 456,
            title: "Sample Movie Two",
            rating: 7.8
        },
        {
            id: 789,
            title: "Sample Movie Three",
            rating: 9.1
        }
    ];

    return (
        <>
            <h1>Home Page</h1>

            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            ))}
        </>
    );
}

export default PageHome;