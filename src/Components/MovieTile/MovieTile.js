import React, {useState} from "react";
import MovieForm from '../MovieForm/MovieForm';
import MovieDelete from "../MovieDelete/MovieDelete";
import SwitchComponents from "../SwitchComponents/SwitchComponents";
import Dialog from "../Dialog/Dialog";
import styles from './MovieTile.module.scss';
import { useNavigate } from 'react-router-dom';
const MovieTile = (props) => {

    const [showMenu, setShowMenu] = useState(false);
    const movie = props.movieTileItem;
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('edit');
    const [activeComponent, setActiveComponent] = useState("movie-form");
    const navigate = useNavigate();

    const handleMenuClick = (event , action) => {
        event.stopPropagation();
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

    const handleTileClick = () => {
        navigate(`/${movie.id}`);
    };

    const openMenu = (event) => {
        event.stopPropagation();
        setShowMenu(true);
    }

    return (
        <div className={styles.movietile} onClick={handleTileClick} role='movie-tile'>
            <div className={styles.movietileImage}>
                <img src={movie?.poster_path} alt={movie?.title} onError={(e) => e.target.src = 'https://placehold.co/319x450'}/>
                <button role="showMenuButton" className={styles.menuButton} onClick={(event) => openMenu(event)}></button>
            </div>

            <div className={styles.info}>
                <div className={styles.infoRow}><h3 className={styles.headerH3}>{movie?.title}</h3>
                    <span
                    className={'release-year'}>{movie?.release_date.split('-')[0]}</span></div>
                <div className={styles.genres}><span>{movie?.genres.join(', ')}</span></div>
            </div>

            {showMenu && (
                <div className={subMenu} role="subMenu">
                    <button role="hideMenuButton" className={menuButtonClose}
                            onClick={() => setShowMenu(false)}></button>
                    <ul className={styles.menuList}>
                        <li onClick={(event) => handleMenuClick(event,"edit")}>Edit</li>
                        <li onClick={(event) => handleMenuClick(event,"delete")}>Delete</li>
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
