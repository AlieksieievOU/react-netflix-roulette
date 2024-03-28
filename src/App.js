import React from 'react';
import './App.scss';
import MovieListPage from './Components/MovieListPage/MovieListPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import ErrorPage from "./ErrorPage/ErrorPage";
import Header from "./Components/Header/Header";

function App() {
    return (
        <div className="App" id='js-app'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MovieListPage/>}>
                        <Route index element={<Header/>}/>
                    </Route>

                    <Route path=':movieId' element={<MovieListPage/>}>
                        <Route index element={<MovieDetails/>}/>
                    </Route>

                    <Route path='*' element={<ErrorPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
