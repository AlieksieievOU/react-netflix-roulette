import React, {useState, useContext} from "react";
import styles from './MovieTile.module.scss';

//const MenuContext = React.createContext();
const MovieTile = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const movie = props.movieTileItem;
    //  const { handleMenuAction } = useContext(MenuContext);

    const handleMenuClick = (action) => {
        //    setShowMenu(false);
        //      handleMenuAction(action, movie);
    };

    const handleTileClick = (event) => {
        if (event.target.closest(".menuButton")) return;
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
                <div className={styles.subMenu} role="subMenu">
                    <button role="hideMenuButton" className={styles.menuButtonClose} onClick={() => setShowMenu(false)}></button>
                    <ul className={styles.menuList}>
                        <li onClick={() => handleMenuClick("edit")}>Edit</li>
                        <li onClick={() => handleMenuClick("delete")}>Delete</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default MovieTile;
