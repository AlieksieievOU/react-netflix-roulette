import React, {useState} from 'react';
import styles from './MovieDetails.module.scss';
import Logo from "../Logo/Logo";

function MovieDetails(props) {
    const selectedMovieTitle = props.selectedMovie;

    return (
        <header className={styles.movieHeader}>
        <div className="topWrapper">
            <Logo/>
            <div className={styles.searchButton} onClick={() => props.setActiveComponent('header')}></div>
        </div>

        <div className={styles.movieInfoPanel}>
            <div className={styles.movieInfoImg}><img data-testid="imgPoster" src={selectedMovieTitle?.imageUrl} alt="imgPoster"/></div>
            <div>
                <div className={styles.nameRow}>{selectedMovieTitle?.name} <span>{selectedMovieTitle?.imdbRating}</span></div>
                <div className={styles.genres}>{selectedMovieTitle?.genres}</div>
                <div className={styles.releaseDurationRow}>
                    <span>{selectedMovieTitle?.releaseYear}</span>
                    <span>{selectedMovieTitle?.duration}</span>
                </div>
                <div className={styles.description}>{selectedMovieTitle?.description}</div>
            </div>
        </div>
    </header>
    );
}

export default MovieDetails;