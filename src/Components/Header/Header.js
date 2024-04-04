import React from 'react';
import styles from './Header.module.scss';
import Logo from "../Logo/Logo";
import MovieAdd from "../MovieAdd/MovieAdd";
import SearchForm from "../SearchForm/SearchForm";
const Header = () => {
    return (
        <header data-testid="header">
            <div className={styles.topWrapper}>
                <Logo/>
                <MovieAdd/>
            </div>
            <SearchForm/>
        </header>
    );
};

export default Header;
