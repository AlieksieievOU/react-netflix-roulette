import React, {useState} from 'react';
import styles from './MovieAdd.module.scss';
import Dialog from "../Dialog/Dialog";
import SwitchComponents from "../SwitchComponents/SwitchComponents";
import MovieForm from "../MovieForm/MovieForm";
import MovieSuccess from "../MovieSuccess/MovieSuccess";

const MovieAdd = (props) => {
    const movie = props.movieTileItem;
    const [action, setAction] = useState('add');
    const [activeComponent, setActiveComponent] = useState("movie-form");
    const [showModal, setShowModal] = useState(false);

    const handleClick = (action) => {
        setAction(action);

        if (action === 'success') {
            setActiveComponent('movie-success');
        } else {
            setActiveComponent('movie-form');
        }

        setShowModal(true);
    };

    return (
        <>
        <div className={styles.MovieAddWrapper} onClick={() => handleClick('add')}>
            + add movie
        </div>

            <Dialog showModal={showModal} onClose={() => setShowModal(false)}>
                <SwitchComponents active={activeComponent} formContent={movie} action={action}>
                    <MovieForm name="movie-form" formContent={movie} action={action} />
                    <MovieSuccess name="movie-success" formContent={movie} action={action} />
                </SwitchComponents>
            </Dialog>
        </>
    );
};

export default MovieAdd;