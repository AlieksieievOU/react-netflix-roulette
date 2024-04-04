import React, {useState, useEffect, useCallback, useRef, createContext} from "react";
import styles from './MovieListPage.module.scss';
import GenreSelector from '../../Components/GenreSelector/GenreSelector';
import SortControl from '../../Components/SortControl/SortControl';
import MoviesFound from '../../Components/MoviesFound/MoviesFound';
import MovieTile from '../../Components/MovieTile/MovieTile';
import Logo from '../../Components/Logo/Logo';
import {Outlet, useNavigate, useSearchParams} from "react-router-dom";
import {GenreListArray, SortControlArray} from '../../data';
import Dialog from "../../Components/Dialog/Dialog";
import SwitchComponents from "../../Components/SwitchComponents/SwitchComponents";
import MovieForm from "../../Components/MovieForm/MovieForm";
import MovieDelete from "../../Components/MovieDelete/MovieDelete";
import MovieSuccess from "../../Components/MovieSuccess/MovieSuccess";

const url = 'http://localhost:4000/movies?';
const SearchContext = createContext({
    onSearch: null,
    isLoading: null,
    onSetShowModal: false,
    onSetMovie: {},
    onSetAction: null,
    onSetActiveComponent: null,
    selectedMovie: null
});

const MovieListPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCriterion, setSortCriterion] = useState('1');
    const [activeGenre, setActiveGenre] = useState('all');
    const [movieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movieListLength, setMovieListLength] = useState(movieList.length);
    const [isLoading, setIsLoading] = useState(false);
    const [initDone, setInitDone] = useState(false);
    const controllerRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('edit');
    const [activeComponent, setActiveComponent] = useState("movie-form");
    const navigate = useNavigate();
    const onSetActiveComponent = (activeComponent) => {
        setActiveComponent(activeComponent);
    }
    const onSetAction = (action) => {
        setAction(action);
    }

    const onSetMovie = (movie) => {
        setSelectedMovie(movie);
    }

    const onSetShowModal = (value) => {
        setShowModal(value);
    }

    const onSearch = (input) => {
        setSearchQuery(input);
    }

    const onSelectGenre = (genre) => {
        setActiveGenre(genre);
    }

    const onSortControl = (SortControl) => {
        setSortCriterion(SortControl);
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
      //  let [searchParams, setSearchParams] = useSearchParams();
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

            //  let [searchParams, setSearchParams] = useSearchParams();
        const queryParams = new URLSearchParams(window.location.search);

        if (searchQuery !== '') {
            queryParams.set('searchBy', 'title');
            queryParams.set('search', searchQuery)
        } else if (activeGenre?.id && activeGenre?.id !== 0 && searchQuery === '') {
            queryParams.set('searchBy', 'genres');
            queryParams.set('search', activeGenre.name);
        } else {
            queryParams.delete('searchBy');
            queryParams.delete('search');
        }

        queryParams.set('sortBy', sortCriterion === '1' ? 'title' : 'release_date');
        queryParams.set('sortOrder', 'asc');

        let params = queryParams.toString();

        /**
         * Pushing query params to the browser URL
         */
        if (window.history.pushState) {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params;
            window.history.pushState({}, '', newUrl);
        }

        /**
         * Calling the method to get the movies list
         */
        searchMovies(params);

    }, [searchQuery, activeGenre, sortCriterion, searchMovies, initDone]);


    /**
     * We can put some loader here
     */
    if (!initDone) return null;

    return (
        <>
            <SearchContext.Provider value={{onSearch, isLoading, onSetShowModal, onSetMovie, onSetAction, onSetActiveComponent}}>
                <div className="left-column">
                    <Outlet/>
                    <main>
                        <nav>
                            <GenreSelector defaultSelectedGenre={activeGenre?.id || 0} genreList={GenreListArray}
                                           onSelectGenre={onSelectGenre}/>
                            <SortControl defaultSelectedSortControl={sortCriterion || 1} SortControl={SortControlArray}
                                         onSortControl={onSortControl}/>
                        </nav>
                        <section>
                            <MoviesFound defaultMoviesCount={movieListLength}/>
                            <div data-testid="movie-list" className={styles.moviesFoundResults}>
                                {movieList.map((movieTile, index) =>
                                    <MovieTile movieTileItem={movieTile} key={index}/>
                                )}
                            </div>
                        </section>
                    </main>
                    <footer>
                        <Logo/>
                    </footer>
                </div>

                <Dialog showModal={showModal} onClose={() => onSetShowModal(false)}>
                    <SwitchComponents active={activeComponent} action={action}>
                        <MovieForm name="movie-form" formContent={selectedMovie} action={action}/>
                        <MovieDelete name="movie-delete" formContent={selectedMovie} action={action}/>
                        <MovieSuccess name="movie-success" formContent={selectedMovie} action={action} />
                    </SwitchComponents>
                </Dialog>

            </SearchContext.Provider>
        </>
    );
};

export {MovieListPage, SearchContext}
