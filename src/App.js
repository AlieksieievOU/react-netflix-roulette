import React from 'react';
import './App.scss';
import {MovieListPage} from './Components/MovieListPage/MovieListPage';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import ErrorPage from "./ErrorPage/ErrorPage";
import Header from "./Components/Header/Header";

function App() {
    const router = createBrowserRouter([{
        path: "/",
        element: <MovieListPage/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Header/>,
            },
            {
                path: "movie/:movieId/",
                element: <MovieDetails/>
            }
        ],
    }]);

    return (
        <div className="App" id='js-app'>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
