import React, {useContext, useState} from "react";
import styles from './MovieTile.module.scss';
import {useNavigate} from 'react-router-dom';
import {SearchContext} from "../../pages/MovieListPage/MovieListPage";

const MovieTile = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const movie = props.movieTileItem;
    const navigate = useNavigate();
    const searchContextValues = useContext(SearchContext);

    const handleTileMenuClick = (event, action) => {
        event.stopPropagation();
        const queryParams = new URLSearchParams(window.location.search);

        if (action === 'delete') {
            searchContextValues.onSetActiveComponent('movie-delete')
        } else {

            const queryParams = new URLSearchParams(window.location.search);
            let url = `/movies/${movie.id}/edit`;

            if (queryParams.toString() !== '') {
                url = `/movies/${movie.id}/edit` + "?" + queryParams.toString();
            }

            navigate(url);
            searchContextValues.onSetActiveComponent('movie-form')
        }

        setShowMenu(false);
        searchContextValues.onSetMovie(movie);
        searchContextValues.onSetAction(action);
        searchContextValues.onSetShowModal(true);
    };

    const menuButtonClose = styles.menuButtonClose;
    const subMenu = styles.subMenu;

    const handleTileClick = () => {
        const queryParams = new URLSearchParams(window.location.search);
        let url = `/movies/${movie.id}`;

        if (queryParams.toString() !== '') {
            url = `/movies/${movie.id}` + "?" + queryParams.toString();
        }

        navigate(url);
    };


    const openMenu = (event) => {
        event.stopPropagation();
        setShowMenu(true);
    }

    return (
        <div className={styles.movietile} onClick={handleTileClick} role='movie-tile' data-testid="movie-tile">
            <div className={styles.movietileImage}>
                <img src={movie?.poster_path} alt={movie?.title}
                     onError={(e) => e.target.src = 'https://placehold.co/319x450'}/>
                <button role="showMenuButton" className={styles.menuButton}
                        onClick={(event) => openMenu(event)}></button>
            </div>

            <div className={styles.info}>
                <div className={styles.infoRow}><h3 className={styles.headerH3}>{movie?.title}</h3>
                    <span
                        className={'release-year'}>{movie?.release_date.split('-')[0]}</span></div>
                <div className={styles.genres}><span data-testid="movie-genre">{movie?.genres.join(', ')}</span></div>
            </div>

            {showMenu && (
                <div className={subMenu} role="subMenu">
                    <button role="hideMenuButton" className={menuButtonClose}
                            onClick={() => setShowMenu(false)}></button>
                    <ul className={styles.menuList}>
                        <li onClick={(event) => handleTileMenuClick(event, "edit")}>Edit</li>
                        <li onClick={(event) => handleTileMenuClick(event, "delete")}>Delete</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default MovieTile;
