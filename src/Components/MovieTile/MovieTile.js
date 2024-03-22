import React, {useState} from "react";
import MovieForm from '../MovieForm/MovieForm';
import MovieDelete from "../MovieDelete/MovieDelete";
import SwitchComponents from "../SwitchComponents/SwitchComponents";
import Dialog from "../Dialog/Dialog";
import styles from './MovieTile.module.scss';

const MovieTile = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const movie = props.movieTileItem;
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('edit');
    const [activeComponent, setActiveComponent] = useState("movie-form");

    const handleMenuClick = (action) => {
        setAction(action);

        if (action === 'delete') {
            setActiveComponent('movie-delete');
        } else {
            setActiveComponent('movie-form');
        }

        setShowMenu(false);
        setShowModal(true);
    };

    const menuButtonClose = styles.menuButtonClose;
    const subMenu = styles.subMenu;

    const handleTileClick = (event) => {
        if (event.nativeEvent.srcElement.className === subMenu || event.nativeEvent.srcElement.className === menuButtonClose) return;
        props.onSelectMovieTile(movie);
    };

    return (
        <div className={styles.movietile} onClick={handleTileClick} role='movie-tile'>
            <div className={styles.movietileImage}>
                <img src={movie?.imageUrl} alt={movie?.name}/>
                <button role="showMenuButton" className={styles.menuButton} onClick={() => setShowMenu(true)}></button>
            </div>

            <div className={styles.info}>
                <div className={styles.infoRow}><h3 className={styles.headerH3}>{movie?.name}</h3> <span
                    className={'release-year'}>{movie?.releaseYear}</span></div>
                <div className={styles.genres}><span>{movie?.genres}</span></div>
            </div>

            {showMenu && (
                <div className={subMenu} role="subMenu">
                    <button role="hideMenuButton" className={menuButtonClose}
                            onClick={() => setShowMenu(false)}></button>
                    <ul className={styles.menuList}>
                        <li onClick={() => handleMenuClick("edit")}>Edit</li>
                        <li onClick={() => handleMenuClick("delete")}>Delete</li>
                    </ul>
                </div>
            )}

                <Dialog showModal={showModal} onClose={() => setShowModal(false)}>
                    <SwitchComponents active={activeComponent} formContent={movie} action={action}>
                      <MovieForm name="movie-form" formContent={movie} action={action} />
                      <MovieDelete name="movie-delete" formContent={movie} action={action} />
                    </SwitchComponents>
                </Dialog>
        </div>
    );
}

export default MovieTile;
