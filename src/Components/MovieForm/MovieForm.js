import React, {useState} from 'react';
import {GenreListArray} from '../../data';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './MovieForm.module.scss';

const MovieForm = ({formContent, action}) => {
    formContent = action === 'edit' || action === 'delete' ? formContent : {};
    const [state, setState] = useState({
        title: formContent?.title ? formContent?.title : '',
        release_date: formContent?.release_date ? formContent?.release_date : '',
        vote_average: formContent?.vote_average ? formContent?.vote_average : '',
        genres: formContent?.genres ? formContent?.genres: [],
        runtime: formContent?.runtime ? formContent?.runtime : '',
        overview: formContent?.overview ? formContent?.overview : '',
        poster_path: formContent?.poster_path ? formContent?.poster_path : '',
    })

    const handleReset = (event) => {
        event.preventDefault();
        setState({
            title: '',
            release_date: '',
            vote_average: '',
            genres: [],
            runtime: '',
            overview: '',
            poster_path: '',
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
       // onSubmit(state);
    }

    const handleDateChange = (event) => {
        setState({ ...state, release_date: event.target.value });
    }

    const handleDateBlur = (event) => {
        handleDateChange(event);
    }

    const handleChangeSelectGenre = (event) => {
        let options = Array.from(event.target.options);
        let selected = options
            .filter(o => o.selected)
            .map(o => o.value);

        setState({ ...state, genre: selected });
    }

    const handleBlurSelectGenre = (event) => {
        handleChangeSelectGenre(event);
    }

    const handleInputChange = (event) => {
        setState({[event.target.id]: event.target.value });
    };

    const handleBlur = (event) => {
        setState({[event.target.id]: event.target.value });
    };

    const textAreaRow = styles.formRow + " " + styles.textareaRow;

    return (
        <div className={styles.modalContent}>
            {action === 'add' ? (<h2>ADD MOVIE</h2>) : (<h2>EDIT MOVIE</h2>)}
            <Formik
                initialValues={state}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleInputChange,
                      handleDateChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (<form onSubmit={handleSubmit} onReset={handleReset}>
                <div className={styles.formRow}>
                    <div className={styles.formField}>
                        <label htmlFor='title'>TITLE</label>
                        <input onChange={handleInputChange} onBlur={handleBlur} type="text" value={values.title} placeholder='Movie name' name='title' id='title' />
                        <div>{errors.title && touched.title && errors.title}</div>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor='release_date'>RELEASE DATE</label>
                        <input onChange={handleDateChange} onBlur={handleDateBlur} aria-label="Date" type="text" value={values.release_date} placeholder='Select Date' name='release_date' id='release_date'/>
                        <div>{errors.release_date && touched.release_date && errors.release_date}</div>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formField}>
                        <label htmlFor='poster_path'>POSTER URL</label>
                        <input onChange={handleInputChange} onBlur={handleBlur} type="text" value={values.poster_path} placeholder='https://' name='poster_path' id='poster_path'/>
                        <div>{errors.poster_path && touched.poster_path && errors.poster_path}</div>
                    </div>

                    <div className={styles.formField}>
                        <label htmlFor='vote_average'>RATING</label>
                        <input onChange={handleInputChange} onBlur={handleBlur} type="text" value={values.vote_average} placeholder='IMDB Rating' id='vote_average' name='vote_average'/>
                        <div>{errors.vote_average && touched.vote_average && errors.vote_average}</div>
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formField}>
                        <label htmlFor="genres">GENRES</label>
                        <select onChange={handleChangeSelectGenre} onBlur={handleBlurSelectGenre} value={values.genres}  name="genres" id="genres" multiple>
                            {GenreListArray.map(
                                (genre) => <option data-testid="genre" id={genre.id}
                                                   key={genre.id}>{genre.name}</option>
                            )}
                        </select>
                        <div>{errors.genres && touched.genres && errors.genres}</div>
                    </div>

                    <div className={styles.formField}>
                        <label htmlFor='runtime'>RUNTIME</label>
                        <input onChange={handleInputChange} onBlur={handleBlur}  type="text" value={values.runtime} placeholder='Duration' name='runtime'/>
                        <div>{errors.runtime && touched.runtime && errors.runtime}</div>
                    </div>
                </div>

                <div className={textAreaRow}>
                    <div className={styles.formField}>
                        <label htmlFor='overview'>OVERVIEW</label>
                        <textarea onChange={handleInputChange} onBlur={handleBlur} name="overview" id="overview" placeholder='Movie Description'
                                  value={values.overview}></textarea>
                        <div>{errors.overview && touched.overview && errors.overview}</div>
                    </div>
                </div>
                <div className={styles.buttonsRow}>
                    <input type="submit" value="Submit"/>
                    <input type="reset" value="Reset"/>
                </div>
            </form>
                )}
            </Formik>
        </div>
    );
}

export default MovieForm;
