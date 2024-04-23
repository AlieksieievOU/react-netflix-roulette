import React, {StrictMode} from 'react';
// import './App.scss';
import {MovieListPage} from './pages/MovieListPage/MovieListPage';
// import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import MovieDetails from "./Components/MovieDetails/MovieDetails";
// import ErrorPage from "./pages/ErrorPage/ErrorPage";
// import Header from "./Components/Header/Header";

function App() {
    // const router = createBrowserRouter([{
    //     path: "/",
    //     element: <MovieListPage/>,
    //     errorElement: <ErrorPage/>,
    //     children: [
    //         {
    //             path: "/",
    //             element: <Header/>,
    //         },
    //         {
    //             path: "movies/:movieId",
    //             element: <MovieDetails/>,
    //             children: [{
    //                 path: "edit",
    //                 element: <MovieDetails/>
    //             }]
    //         },
    //         {
    //             path: "new",
    //             element: <Header/>
    //         }
    //     ],
    // }]);

    return (
        <div className="App" id='js-app'>
            <MovieListPage/>
        </div>
    );
}

export default App;
