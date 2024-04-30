"use client"
import { useRouter } from 'next/navigation'
import styles from '../MovieDetails/MovieDetails.module.scss';
import React from "react";

const SearchButton = () => {
    const router = useRouter();
    const searchButtonClick = () => {
        router.push('/')
    };

    return (
        <div data-testid="search-button" className={styles.searchButton} onClick={searchButtonClick}></div>
    );
};

export default SearchButton;
