import React from 'react';
import { useState } from 'react';
import styles from './MoviesFound.module.scss';
const labelResult = "movies found";

const MoviesFound = (props) => {
    const [moviesCount, setMoviesCount] = useState(parseInt(props.defaultMoviesCount));

    return (
        <div className={styles.moviesCountWrapper}>
            <span>{moviesCount}</span> {labelResult}
        </div>
    );
};

export default MoviesFound;