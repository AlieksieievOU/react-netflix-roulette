import React, {useCallback, useContext, useRef, useState} from 'react';
import {SearchContext} from "../../pages/MovieListPage/MovieListPage";
import {useNavigate} from "react-router-dom";
import styles from './MovieDelete.module.scss';

const MovieDelete = () => {
    const searchContextValues = useContext(SearchContext);
    const controllerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleDeleteClick = () => {
        deleteMovie(searchContextValues.selectedMovie.id);
    }

    const deleteMovie = useCallback(async (movieId) => {
        const url = `http://localhost:4000/movies/${movieId}`;
        controllerRef.current?.abort();
        setIsLoading(true);
        const newController = new AbortController();
        controllerRef.current = newController;
        const signal = newController.signal;
        signal.addEventListener("abort", () => {
            console.log("aborted!")
        });

        try {
            const response = await fetch(url , {method:  'DELETE', signal});
            const data = await response.json();

        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
            controllerRef.current = null;
            searchContextValues.onSetShowModal(false);
        }
    }, []);

    return (
        <div data-testid="delete-movie-dialog" className={styles.modalWrapperDelete}>
            <h2>Delete MOVIE</h2>
            <div className={styles.modalText}>
                Are you sure you want to delete this movie?
            </div>
            <div className={styles.modalButtonWrapper}>
                <button onClick={(event) => handleDeleteClick(event)}>confirm</button>
            </div>
        </div>
    );
}

export default MovieDelete;
