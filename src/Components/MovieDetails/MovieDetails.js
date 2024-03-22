import React from 'react';
import styles from './MovieDetails.module.scss';
import Logo from "../Logo/Logo";

function MovieDetails(props) {
    const selectedMovieTitle = props.selectedMovie;

    return (
        <header className={styles.movieHeader}>
        <div className={styles.topWrapper}>
            <Logo/>
            <div className={styles.searchButton} onClick={() => props.setActiveComponent('header')}></div>
        </div>

        <div className={styles.movieInfoPanel}>
            <div className={styles.movieInfoImg}><img data-testid="imgPoster" onError={(e) => e.target.src = 'https://placehold.co/319x450'} src={selectedMovieTitle?.poster_path} alt="imgPoster"/></div>
            <div>
                <div className={styles.nameRow}>{selectedMovieTitle?.title} <span>{selectedMovieTitle?.vote_average}</span></div>
                <div className={styles.genres}>{selectedMovieTitle?.genres.join(', ')}</div>
                <div className={styles.releaseDurationRow}>
                    <span>{selectedMovieTitle?.release_date.split('-')[0]}</span>
                    <span>{selectedMovieTitle?.runtime + ' min'}</span>
                </div>
                <div className={styles.description}>{selectedMovieTitle?.overview}</div>
            </div>
        </div>
    </header>
    );
}

export default MovieDetails;
