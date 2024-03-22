import React, {useState} from "react";
import './App.scss';
import GenreSelector from './Components/GenreSelector/GenreSelector';
import SortControl from './Components/SortControl/SortControl';
import MoviesFound from './Components/MoviesFound/MoviesFound';
import MovieTile from './Components/MovieTile/MovieTile';
import Logo from './Components/Logo/Logo';
import Header from './Components/Header/Header';
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import SwitchComponents from "./Components/SwitchComponents/SwitchComponents";
import {GenreListArray, SortControlArray, movieTilesArray} from './data';



function App() {
    const [activeComponent, setActiveComponent] = useState("header");
    const [selectedMovie, setSelectedMovie] = useState({});

    const onSelectGenre = function (genre) {
        console.log(genre)
    }

    const onSortControl = function (SortControl) {
        console.log(SortControl)
    }

    const onSelectMovieTile = function (selectedMovie) {
        setActiveComponent('movie-details');
        setSelectedMovie(selectedMovie);
    }

    return (
        <div className="App" id='js-app'>
            <div className="left-column">
                <SwitchComponents active={activeComponent}>
                    <Header name="header" />
                    <MovieDetails name="movie-details" selectedMovie={selectedMovie} setActiveComponent={setActiveComponent} />
                </SwitchComponents>
                <main>
                    <nav>
                        <GenreSelector defaultSelectedGenre={0} genreList={GenreListArray}
                                       onSelectGenre={onSelectGenre}/>
                        <SortControl defaultSelectedSortControl={1} SortControl={SortControlArray}
                                     onSortControl={onSortControl}/>
                    </nav>
                    <section>
                        <MoviesFound defaultMoviesCount={movieTilesArray.length}/>
                        <div className="moviesFoundResults">
                            {movieTilesArray.map(
                                (movieTile, index) => <MovieTile onSelectMovieTile={onSelectMovieTile} movieTileItem={movieTile} key={index}/>
                            )}
                        </div>
                    </section>
                </main>
                <footer>
                    <Logo/>
                </footer>
            </div>
        </div>
    );
}

export default App;