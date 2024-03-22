import React, {useState, useEffect, useCallback} from "react";
import styles from './MovieListPage.module.scss';
import GenreSelector from '../GenreSelector/GenreSelector';
import SortControl from '../SortControl/SortControl';
import MoviesFound from '../MoviesFound/MoviesFound';
import MovieTile from '../MovieTile/MovieTile';
import Logo from '../Logo/Logo';
import Header from '../Header/Header';
import MovieDetails from "../MovieDetails/MovieDetails";
import SwitchComponents from "../SwitchComponents/SwitchComponents";
import {GenreListArray, SortControlArray} from '../../data';

const MovieListPage = () => {
    const [activeComponent, setActiveComponent] = useState("header");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCriterion, setSortCriterion] = useState('');
    const [activeGenre, setActiveGenre] = useState('all');
    const [movieList, setMovieList] = useState([]);
    const [movieListLength, setMovieListLength] = useState(movieList.length);
    const [isLoading, setIsLoading] = useState(false);
    const [controller, setController] = useState(new AbortController());
    let queryParams = new URLSearchParams();
    const [queryParamsState, setQueryParamsState] = useState('');

    const onSearch = function (input) {
        queryParams.set('searchBy', 'title')
        queryParams.set('search', input)
        setQueryParamsState(queryParams.toString());
        setSearchQuery(input);
    }

    const onSelectGenre = function (genre) {
         setActiveGenre(genre);
        if (genre.id === 0) {
            queryParams.delete('searchBy');
            queryParams.delete('search');
        } else {
            queryParams.set('searchBy', 'genres');
            queryParams.set('search', genre.name);
        }

        setQueryParamsState(queryParams.toString());
    }

    const onSortControl = function (SortControl) {
        queryParams.set('sortBy', SortControl === '1' ? 'title' : 'release_date');
        setQueryParamsState(queryParams.toString());
        setSortCriterion(SortControl);
    }

    const onSelectMovieTile = function (selectedMovie) {
        setActiveComponent('movie-details');
        setSelectedMovie(selectedMovie);
    }

    const url = 'http://localhost:4000/movies?';
    const searchMovies = useCallback(async () => {
        isLoading && controller.abort();

        setIsLoading(true);

        const newController = new AbortController();
        setController(newController);
        const signal = newController.signal;

        signal.addEventListener("abort", () => {
            console.log("aborted!")
        });

        queryParams.set('sortOrder', 'asc')

        try {
            const response = await fetch(url + queryParams.toString()+"&"+ queryParamsState, {
                signal,
            });
            const movies = await response.json();

            setIsLoading(false);
            setMovieList(movies.data);
            setMovieListLength(movies.data.length)
        } catch (e) {
            console.error({e});
        }
    });


    useEffect(() => {
        searchMovies().then();
    }, [searchQuery, activeGenre, sortCriterion]);

    return (
        <>
            <div className="left-column">
                <SwitchComponents active={activeComponent}>
                    <Header name="header" onSearch={onSearch} searchQuery={searchQuery}/>
                    <MovieDetails name="movie-details" selectedMovie={selectedMovie}
                                  setActiveComponent={setActiveComponent}/>
                </SwitchComponents>
                <main>
                    <nav>
                        <GenreSelector defaultSelectedGenre={0} genreList={GenreListArray}
                                       onSelectGenre={onSelectGenre}/>
                        <SortControl defaultSelectedSortControl={1} SortControl={SortControlArray}
                                     onSortControl={onSortControl}/>
                    </nav>
                    <section>
                        <MoviesFound defaultMoviesCount={movieListLength}/>
                        <div className={styles.moviesFoundResults}>
                            {movieList.map((movieTile, index) =>
                                <MovieTile onSelectMovieTile={onSelectMovieTile} movieTileItem={movieTile} key={index}/>
                            )}
                        </div>
                    </section>
                </main>
                <footer>
                    <Logo/>
                </footer>
            </div>
        </>
    );
};

export default MovieListPage;
