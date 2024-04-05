import React from 'react';
import styles from './MovieSuccess.module.scss';
const check = process.env.PUBLIC_URL + '/images/check.png';

function MovieSuccess(props) {
    return (
        <div data-testid="success-modal" className={styles.modalWrapperSuccess}>
            <div className={styles.modalIcon} >
                <img src={check} alt="Success" />
            </div>
            <h2>congratulations !</h2>
            <div className={styles.modalText}>
                The movie has been added to
                database successfully
            </div>

        </div>
    );
}

export default MovieSuccess;
