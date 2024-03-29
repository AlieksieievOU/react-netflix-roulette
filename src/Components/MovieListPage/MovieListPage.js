import React, {useState, useEffect, useCallback, useRef} from "react";
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

const url = 'http://localhost:4000/movies?';

const MovieListPage = () => {
    const [activeComponent, setActiveComponent] = useState("header");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCriterion, setSortCriterion] = useState('1');
    const [activeGenre, setActiveGenre] = useState('all');
    const [movieList, setMovieList] = useState([]);
    const [movieListLength, setMovieListLength] = useState(movieList.length);
    const [isLoading, setIsLoading] = useState(false);
    const [initDone, setInitDone] = useState(false);
    const controllerRef = useRef(null)
    // let queryParams = new URLSearchParams();
    // const [queryParamsState, setQueryParamsState] = useState('');

    const onSearch = function (input) {
        // queryParams.set('searchBy', 'title')
        // queryParams.set('search', input)
        // setQueryParamsState(queryParams.toString());
        setSearchQuery(input);
    }

    const onSelectGenre = function (genre) {
         setActiveGenre(genre);
        // if (genre.id === 0) {
        //     queryParams.delete('searchBy');
        //     queryParams.delete('search');
        // } else {
        //     queryParams.set('searchBy', 'genres');
        //     queryParams.set('search', genre.name);
        // }

        // setQueryParamsState(queryParams.toString());
    }

    const onSortControl = function (SortControl) {
        // queryParams.set('sortBy', SortControl === '1' ? 'title' : 'release_date');
        // setQueryParamsState(queryParams.toString());
        setSortCriterion(SortControl);
    }

    const onSelectMovieTile = function (selectedMovie) {
        setActiveComponent('movie-details');
        setSelectedMovie(selectedMovie);
    }


    const searchMovies = useCallback(async (queryParams = '') => {
        controllerRef.current?.abort();

        setIsLoading(true);

        const newController = new AbortController();
        controllerRef.current = newController;
        const signal = newController.signal;

        signal.addEventListener("abort", () => {
            console.log("aborted!")
        });


        try {
            const response = await fetch(url + queryParams, {
                signal,
            });
            const movies = await response.json();

            setMovieList(movies.data);
            setMovieListLength(movies.data.length)
        } catch (e) {
            console.error({e});
        } finally {
            setIsLoading(false);
            controllerRef.current = null;
        }
    }, []);

    /**
     * Getting query params from URL and updating the state by values
     * Using setInitDone state handler to set when all the states were synced up with the URL query params
     */
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);

        const sort = queryParams.get('sortBy');
        const searchBy = queryParams.get('searchBy')
        const search = queryParams.get('search')

        if (sort) {
            const sortVal = sort === 'title' ? '1' : '0';

            setSortCriterion(sortVal);
        }

        if (searchBy && search) {
           if (searchBy === 'title') {
               setSearchQuery(search)
           } else {
               setActiveGenre(GenreListArray.find(item => item.name === search) || GenreListArray[0])
           }
        }

        setInitDone(true);

    }, []);


    useEffect(() => {
        if (!initDone) return;

        /**
         * Getting filter / sort states and making query params
         */
        const queryParams = new URLSearchParams();

        if (searchQuery) {
            queryParams.set('searchBy', 'title')
            queryParams.set('search', searchQuery)
        } else if (activeGenre?.id && activeGenre?.id !== 0) {
            queryParams.set('searchBy', 'genres');
            queryParams.set('search', activeGenre.name);
        } else {
            queryParams.delete('searchBy');
            queryParams.delete('search');
        }

        queryParams.set('sortBy', sortCriterion === '1' ? 'title' : 'release_date');

        queryParams.set('sortOrder', 'asc')


        /**
         * Pushing query params to the browser URL
         */
        if (window.history.pushState) {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + queryParams.toString();
            window.history.pushState({},'', newUrl);
        }

        /**
         * Calling the method to get the movies list
         */
        searchMovies(queryParams.toString());

    }, [searchQuery, activeGenre, sortCriterion, searchMovies, initDone]);

    /**
     * We can put some loader here
     */
    if (!initDone) return null;

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
                        <GenreSelector defaultSelectedGenre={activeGenre?.id || 0} genreList={GenreListArray}
                                       onSelectGenre={onSelectGenre}/>
                        <SortControl defaultSelectedSortControl={sortCriterion || 1} SortControl={SortControlArray}
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
