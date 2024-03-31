import React, {useState, useEffect, useCallback, useRef} from "react";
import styles from './MovieDetails.module.scss';
import Logo from "../Logo/Logo";
import {useParams, useNavigate} from "react-router-dom";

function MovieDetails() {
    const [selectedMovie, setSelectedMovie] = useState({
        name: "",
        releaseYear: "",
        imdbRating: "",
        genres: "",
        duration: "",
        description: "",
        imageUrl: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {movieId} = useParams();
    const navigate = useNavigate();
    const controllerRef = useRef(null);
    const url = `http://localhost:4000/movies/${movieId}`;

    const fetchMovie = useCallback(async () => {
        controllerRef.current?.abort();

        setIsLoading(true);

        const newController = new AbortController();
        controllerRef.current = newController;
        const signal = newController.signal;

        signal.addEventListener("abort", () => {
            console.log("aborted!")
        });

        try {
            const response = await fetch(url, {
                signal,
            });
            const data = await response.json();
            setSelectedMovie({
                title: data?.title,
                release_date: data?.release_date.split('-')[0],
                vote_average: data?.vote_average,
                genres: data?.genres.join(', '),
                runtime: data?.runtime,
                overview: data?.overview,
                poster_path: data?.poster_path
            });

        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
            controllerRef.current = null;
        }
    }, []);

    const searchButtonClick = () => {
        navigate('/');
    };

    useEffect(() => {
        fetchMovie();
    }, [movieId]);

    return (
        <header className={styles.movieHeader}>
            <div className={styles.topWrapper}>
                <Logo/>
                <div className={styles.searchButton} onClick={searchButtonClick}></div>
            </div>

            <div className={styles.movieInfoPanel}>
                <div className={styles.movieInfoImg}><img data-testid="imgPoster"
                                                          onError={(e) => e.target.src = 'https://placehold.co/319x450'}
                                                          src={selectedMovie?.poster_path} alt="imgPoster"/></div>
                <div>
                    <div className={styles.nameRow}>{selectedMovie?.title} <span>{selectedMovie?.vote_average}</span>
                    </div>
                    <div className={styles.genres}>{selectedMovie?.genres}</div>
                    <div className={styles.releaseDurationRow}>
                        <span>{selectedMovie?.release_date}</span>
                        <span>{selectedMovie?.runtime + ' min'}</span>
                    </div>
                    <div className={styles.description}>{selectedMovie?.overview}</div>
                </div>
            </div>
        </header>
    );
}

export default MovieDetails;
