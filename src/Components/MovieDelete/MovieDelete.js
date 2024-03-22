import React from 'react';
import styles from './MovieDelete.module.scss';
const MovieDelete = () => {
    return (
        <div className={styles.modalWrapperDelete}>
            <h2>Delete MOVIE</h2>
            <div className={styles.modalText}>
                Are you sure you want to delete this movie?
            </div>
            <div className={styles.modalButtonWrapper}>
                <button>confirm</button>
            </div>
        </div>
    );
}

export default MovieDelete;