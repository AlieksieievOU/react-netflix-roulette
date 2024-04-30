"use client"
import React, {useContext, useEffect, useState} from "react";
import { useRouter } from 'next/navigation'
import styles from './MovieTile.module.scss';
import Image from "next/image";
import Link from "next/link";
//import {useNavigate, useSearchParams} from 'react-router-dom';
//import {SearchContext} from "../MovieListPage/MovieListPage";

const MovieTile = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const movie = props.movieTileItem;
    const router = useRouter();
   // const navigate = useNavigate();
 //   const searchContextValues = useContext(SearchContext);
 //   const [searchParams , setSearchParams] = useSearchParams();
    const handleTileMenuClick = (event, action) => {
        event.stopPropagation();
        setShowMenu(false);

        if (action === 'delete') {
            searchContextValues.onSetActiveComponent('movie-delete')
        } else {
            // navigate(
            //     {
            //         pathname: `/movies/${movie.id}/edit`,
            //         search: searchParams.toString()
            //     }
            // )

            searchContextValues.onSetActiveComponent('movie-form')
        }

        searchContextValues.onSetMovie(movie);
        searchContextValues.onSetAction(action);
        searchContextValues.onSetShowModal(true);
    };

    const menuButtonClose = styles.menuButtonClose;
    const subMenu = styles.subMenu;

    // const handleTileClick = () => {
    //     router.push(`/movie/${movie.id}`);
    // };

    const openMenu = (event) => {
        event.stopPropagation();
        setShowMenu(true);
    }

    // useEffect(() => {
    //     setSearchParams(new URLSearchParams(window.location.search))
    // }, [searchParams]);
    const [src, setSrc] = useState(movie.poster_path);



    return (

        <div className={styles.movietile} role='movie-tile' data-testid="movie-tile">
            <Link className={styles.tileLink} href={`/movie/${movie.id}`}>
            <div className={styles.movietileImage}>
                <Image className={'img'}  data-testid="imgPoster" quality={75} width={0} height={0} style={{width: "319px", height: "auto" }} src={src} alt={movie?.title} unoptimized={true}
                       onError={() => setSrc('https://placehold.co/319x450')}/>
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
            </Link>
        </div>
    );
}

export default MovieTile;
