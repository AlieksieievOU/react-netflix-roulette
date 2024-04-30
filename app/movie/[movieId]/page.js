import MovieDetails from '../../../components/MovieDetails/MovieDetails';
import MovieListPage from "../../../components/MovieListPage/MovieListPage";

async function getMovie(movieId) {
    const url = `http://localhost:4000/movies/${movieId}`;
    const res = await fetch(url)
    return await res.json();
}

export default async function MoviePage({params}) {
   const movieId = params.movieId;

    const data = await getMovie(movieId);
    const selectedMovieItem = {
        title: data?.title,
        release_date: data?.release_date.split('-')[0],
        vote_average: data?.vote_average,
        genres: data?.genres.join(', '),
        runtime: data?.runtime,
        overview: data?.overview,
        poster_path: data?.poster_path
    };

    return (
        <>
            <MovieListPage searchParams={{}}>
                <MovieDetails selectedMovie={selectedMovieItem}/>
            </MovieListPage>
        </>
    )
}
