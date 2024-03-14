import React from 'react';
import Logo from "../Logo/Logo";
import MovieAdd from "../MovieAdd/MovieAdd";
import SearchForm from "../SearchForm/SearchForm";
import Counter from "../Counter/Counter";

const Header = (props) => {
    const onSearch = function (input) {
        console.log(input);
    }

    return (
        <header data-testid="header">
            <div className="topWrapper">
                <Logo/>
                <MovieAdd/>
            </div>
            <SearchForm onSearch={onSearch} searchQuery='crime'/>
            <Counter initialValue={0}/>
        </header>
    );
};

export default Header;