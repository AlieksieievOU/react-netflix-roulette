import Header from '../components/Header/Header';
import MovieListPage from "../components/MovieListPage/MovieListPage";

export default function MainPage({searchParams}) {
    return (
        <MovieListPage searchParams={searchParams}><Header/></MovieListPage>
    )
}
