"use client"
import React, {useCallback, useContext, useRef, useState} from 'react';
import {GenreListArray} from '../../data';
import {useFormik} from 'formik';
import styles from './MovieForm.module.scss';
import {useNavigate, useSearchParams} from "react-router-dom";
//import {SearchContext} from "../MovieListPage/MovieListPage";
import moment from 'moment';

const MovieForm = ({formContent, action}) => {
  //  const searchContextValues = useContext(SearchContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const controllerRef = useRef(null);
    formContent = action === 'edit' ? formContent : {};
    const validate = values => {
        const errors = {};

        if (!values.title) {
            errors.title = 'Required';
        }

        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!values.release_date) {
            errors.release_date = 'Required';
        } else if (!moment(values.release_date, "YYYY-MM-DD").isValid()) {
            errors.release_date = 'Invalid date format';
        }

        if (!values.genres.length) {
            errors.genres = 'Select at least one genre to proceed';
        }

        if (!values.vote_average) {
            errors.vote_average = 'Required';
        }

        if (!values.runtime) {
            errors.runtime = 'Required';
        }

        if (!values.overview) {
            errors.overview = 'Required';
        }

        const urlRegex = /^(http|https):\/\/([\w\-]+\.)+[a-zA-Z]{2,}(\/?[\w\-\.~:\?#\[\]@!$&'\(\)\*\+,;=]*)?$/;
        if (!values.poster_path) {
            errors.poster_path = 'Required';
        } else if (urlRegex.test(values.poster_path)) {
            errors.poster_path = 'Wrong url format';
        }
        return errors;
    };

    const onSubmit = async (values, actions) => {
        let clone = Object.assign({}, values);

        if (action === 'add') {
            delete clone.id;
        }

        await updateMovie(clone);

    };

    const onReset = async (values, actions) => {
        await actions.setValues({
            id: formContent?.id ? formContent?.id : '',
            title: formContent?.title ? formContent?.title : '',
            release_date: formContent?.release_date ? formContent?.release_date : '',
            vote_average: formContent?.vote_average ? formContent?.vote_average : '',
            genres: formContent?.genres ? formContent?.genres : [],
            runtime: formContent?.runtime ? formContent?.runtime : '',
            overview: formContent?.overview ? formContent?.overview : '',
            poster_path: formContent?.poster_path ? formContent?.poster_path : '',
        });
    };

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        handleReset,
        setFieldError,
        setErrors
    } = useFormik({
        initialValues: {
            id: formContent?.id ? formContent?.id : '',
            title: formContent?.title ? formContent?.title : '',
            release_date: formContent?.release_date ? formContent?.release_date : '',
            vote_average: formContent?.vote_average ? formContent?.vote_average : '',
            genres: formContent?.genres ? formContent?.genres : [],
            runtime: formContent?.runtime ? formContent?.runtime : '',
            overview: formContent?.overview ? formContent?.overview : '',
            poster_path: formContent?.poster_path ? formContent?.poster_path : '',
        },
        validate,
        onSubmit,
        onReset,
    });

    const textAreaRow = styles.formRow + " " + styles.textareaRow;

    const updateMovie = useCallback(async (movie) => {

        const url = `http://localhost:4000/movies/`;

        controllerRef.current?.abort();
        setIsLoading(true);
        const newController = new AbortController();
        controllerRef.current = newController;
        const signal = newController.signal;

        signal.addEventListener("abort", () => {
            console.log("aborted!")
        });

        try {
            const response = await fetch(url, {
                method: action === 'add' ? "POST" : "PUT",
                body: JSON.stringify(movie),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                signal
            });

            const data = await response.json();

            if (!data.hasOwnProperty('messages')) {
                if (action === 'add') {
                    searchContextValues.onSetActiveComponent('movie-success')
                } else {
                    searchContextValues.onSetShowModal(false);
                }

                if (window.location.pathname.indexOf("movies") !== -1) {
                    window.location.reload();
                }

                navigate(
                    {
                        pathname: `/movies/${data.id}`,
                        search: searchParams.toString()
                    }
                )
            } else {

                let formattedErrors = {};
                const regex = /\"(.+?)\"/i;

                for (let i = 0; i < data?.messages.length; i++) {
                    let match = regex.exec(data?.messages[i]);

                    if (match) {
                        const field = match[1];
                        const errorMessage = data?.messages[i].slice(match[0].length).trim();
                        formattedErrors = { ...formattedErrors, [field]: errorMessage };
                        setFieldError(field, errorMessage);
                    }
                }
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
            controllerRef.current = null;
        }
    }, []);

    return (
        <div data-testid="movie-form-modal" className={styles.modalContent}>
            {action === 'add' ? (<h2>ADD MOVIE</h2>) : (<h2>EDIT MOVIE</h2>)}
            <form onSubmit={handleSubmit} onReset={handleReset} autoComplete="off">
                <div className={styles.formRow}>
                    <div className={styles.formField}>
                        <label htmlFor='title'>TITLE</label>
                        <input value={values.id} type="hidden" id='id'/>

                        <input value={values.title}
                               onChange={handleChange}
                               onBlur={handleBlur} type="text"
                               placeholder='Movie name'
                               id='title'/>
                        {errors.title && touched.title && <div className={styles.formFieldErrors}>{errors.title}</div>}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor='release_date'>RELEASE DATE</label>
                        <input value={values.release_date}
                               onChange={handleChange}
                               onBlur={handleBlur} aria-label="Date" type="text" placeholder='YYYY-MM-DD'
                               id='release_date'/>
                        {errors.release_date && touched.release_date &&
                            <div className={styles.formFieldErrors}>{errors.release_date}</div>}
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formField}>
                        <label htmlFor='poster_path'>POSTER URL</label>
                        <input value={values.poster_path}
                               onChange={handleChange}
                               onBlur={handleBlur} type="text" placeholder='https://' id='poster_path'/>
                        {errors.poster_path && touched.poster_path &&
                            <div className={styles.formFieldErrors}>{errors.poster_path}</div>}
                    </div>

                    <div className={styles.formField}>
                        <label htmlFor='vote_average'>RATING</label>
                        <input value={values.vote_average}
                               onChange={handleChange}
                               onBlur={handleBlur} type="number" placeholder='IMDB Rating' id='vote_average'/>
                        {errors.vote_average && touched.vote_average &&
                            <div className={styles.formFieldErrors}>{errors.vote_average}</div>}
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formField} data-testid="genre-row">
                        <label htmlFor="genres">GENRES</label>
                        <select value={values.genres}
                                onChange={handleChange}
                                onBlur={handleBlur} id="genres" multiple>
                            {GenreListArray.map(
                                (genre) => <option data-testid="genre" id={genre.id}
                                                   key={genre.id}>{genre.name}</option>
                            )}
                        </select>
                        {errors.genres && touched.genres &&
                            <div className={styles.formFieldErrors}>{errors.genres}</div>}
                    </div>

                    <div className={styles.formField}>
                        <label htmlFor='runtime'>RUNTIME</label>
                        <input value={values.runtime}
                               onChange={handleChange}
                               onBlur={handleBlur} type="number" placeholder='Duration' id='runtime'/>
                        {errors.runtime && touched.runtime &&
                            <div className={styles.formFieldErrors}>{errors.runtime}</div>}
                    </div>
                </div>

                <div className={textAreaRow}>
                    <div className={styles.formField}>
                        <label htmlFor='overview'>OVERVIEW</label>
                        <textarea value={values.overview}
                                  onChange={handleChange}
                                  onBlur={handleBlur} id="overview" placeholder='Movie Description'></textarea>
                        {errors.overview && touched.overview &&
                            <div className={styles.formFieldErrors}>{errors.overview}</div>}
                    </div>
                </div>
                <div className={styles.buttonsRow}>
                    <input type="submit" value="Submit" disabled={isSubmitting}/>
                    <input type="reset" value="Reset"/>
                </div>
            </form>
        </div>
    );
}

export default MovieForm;
