import React, {useState, useEffect, useCallback} from "react";
import styles from './MovieDetails.module.scss';
import Logo from "../Logo/Logo";
import {useParams, useNavigate} from "react-router-dom";

function MovieDetails(props) {
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

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/movies/${movieId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }
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

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const searchButtonClick = () => {
        navigate('/');
    };

    useEffect(() => {
        fetchData();
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
