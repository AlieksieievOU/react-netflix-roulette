import React from 'react';
import styles from './Header.module.scss';
import Logo from "../Logo/Logo";
import MovieAdd from "../MovieAdd/MovieAdd";
import SearchForm from "../SearchForm/SearchForm";

const Header = (props) => {
    return (
        <header data-testid="header">
            <div className={styles.topWrapper}>
                <Logo/>
                <MovieAdd/>
            </div>
            <SearchForm onSearch={props.onSearch} searchQuery={props.searchQuery}/>
        </header>
    );
};

export default Header;
