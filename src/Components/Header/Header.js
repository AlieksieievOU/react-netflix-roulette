import React from 'react';
import styles from './Header.module.scss';
import Logo from "../Logo/Logo";
import MovieAdd from "../MovieAdd/MovieAdd";
import SearchForm from "../SearchForm/SearchForm";
import Counter from "../Counter/Counter";

const Header = (props) => {
    return (
        <header data-testid="header">
            <div className={styles.topWrapper}>
                <Logo/>
                <MovieAdd/>
            </div>
            <SearchForm onSearch={props.onSearch} searchQuery={props.searchQuery}/>
            <Counter initialValue={0}/>
        </header>
    );
};

export default Header;
