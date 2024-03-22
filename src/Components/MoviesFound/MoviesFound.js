import React from 'react';
import styles from './MoviesFound.module.scss';
const labelResult = "movies found";

const MoviesFound = (props) => {

    return (
        <div className={styles.moviesCountWrapper}>
            <span>{props.defaultMoviesCount}</span> {labelResult}
        </div>
    );
};

export default MoviesFound;
