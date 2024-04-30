"use client"
import React, {useState, useContext, useEffect} from 'react';
// import {SearchContext} from '../../pages/MovieListPage/MovieListPage';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import styles from './SearchForm.module.scss';
const title = 'FIND YOUR MOViE';
const inputPlaceholder = 'What do you want to watch';

const SearchForm = () => {
    const router = useRouter()
    const pathname = usePathname();
    const { replace, push} = useRouter();
    const searchParams = useSearchParams()
    const search = searchParams.get('search') || '';
    const [searchQuery, setSearchQuery] = useState(search);
    const [searchUrl, setSearchUrl] = useState("");
 //   const SearchContextValues = useContext(SearchContext);
    const handleInputChange = (value) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }

        if (searchQuery !== '' && params.get('searchBy') === null) {
            params.set('searchBy', 'title');
        }
        setSearchQuery(params.toString());
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const params = new URLSearchParams(searchQuery);
        if (searchQuery) return router.push(`${pathname}?${params.toString()}`);
        if (!searchQuery) return router.push("/")
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleFormSubmit(event);
        }
    };

    const load = null;
   // const load = SearchContextValues.isLoading || null;

    return (
        <div className={styles.searchFormContainer} data-testid="search-container">
            <h2 className={'h2'}>{title}</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    placeholder={inputPlaceholder}
                    role="searchbox"
                    type="text"
                    onKeyDown={handleKeyDown}
                    // value={searchQuery}
                    onChange={(e) => {
                        handleInputChange(e.target.value);
                    }}
                    defaultValue={searchParams.get('search')?.toString()}
                    data-testid="search-input"

                />
                <button data-testid="search-button" type="submit" value="Submit" disabled={load}>
                    {/*{SearchContextValues.isLoading ? 'Searching...' : 'Search'}*/}

                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchForm;
