import React, {useState, useContext, useEffect} from 'react';
import {SearchContext} from '../MovieListPage/MovieListPage';
import styles from './SearchForm.module.scss';
const title = 'FIND YOUR MOViE';
const inputPlaceholder = 'What do you want to watch';

const SearchForm = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const SearchContextValues = useContext(SearchContext);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        SearchContextValues.onSearch(searchQuery);
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            SearchContextValues.onSearch(searchQuery);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        if (searchQuery !== '') {
            queryParams.set('searchBy', 'title');
        }

        setSearchQuery(queryParams.get('search') ? queryParams.get('search') : "" );

    },[]);

    return (
        <div className={styles.searchFormContainer}>
            <h2>{title}</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    placeholder={inputPlaceholder}
                    role="searchbox"
                    type="text"
                    onKeyDown={handleKeyDown}
                    value={searchQuery}
                    onChange={handleInputChange}
                    data-testid="search-input"
                />
                <button data-testid="search-button" type="submit" value="Submit" disabled={SearchContextValues.isLoading}>
                    {SearchContextValues.isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>
        </div>
    );
};

export default SearchForm;
