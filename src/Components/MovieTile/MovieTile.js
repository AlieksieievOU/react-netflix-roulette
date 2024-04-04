import React, {useContext, useEffect, useState} from "react";
import styles from './MovieTile.module.scss';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {SearchContext} from "../../pages/MovieListPage/MovieListPage";

const MovieTile = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const movie = props.movieTileItem;
    const navigate = useNavigate();
    const searchContextValues = useContext(SearchContext);
    const [searchParams , setSearchParams] = useSearchParams();
    const handleTileMenuClick = (event, action) => {
        event.stopPropagation();
        setShowMenu(false);

        if (action === 'delete') {
            searchContextValues.onSetActiveComponent('movie-delete')
        } else {
            navigate(
                {
                    pathname: `/movies/${movie.id}/edit`,
                    search: searchParams.toString()
                }
            )

            searchContextValues.onSetActiveComponent('movie-form')
        }

        searchContextValues.onSetMovie(movie);
        searchContextValues.onSetAction(action);
        searchContextValues.onSetShowModal(true);
    };

    const menuButtonClose = styles.menuButtonClose;
    const subMenu = styles.subMenu;

    const handleTileClick = () => {
        navigate(
            {
                pathname: `/movies/${movie.id}`,
                search: searchParams.toString()
            }
        )
    };

    const openMenu = (event) => {
        event.stopPropagation();
        setShowMenu(true);
    }

    useEffect(() => {
        setSearchParams(new URLSearchParams(window.location.search))
    }, [searchParams]);

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
