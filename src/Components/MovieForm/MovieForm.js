import React, {useState} from 'react';
import {GenreListArray} from '../../data';
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

    const handleChangeSelectGenre = (event) => {
        let options = Array.from(event.target.options);
        let selected = options
            .filter(o => o.selected)
            .map(o => o.value);

        setState({ ...state, genre: selected });
    }

    const handleInputChange = (event) => {
        setState({[event.target.id]: event.target.value });
    };

    const textAreaRow = styles.formRow + " " + styles.textareaRow;

    return (
        <div className={styles.modalContent}>
            {action === 'add' ? (<h2>ADD MOVIE</h2>) : (<h2>EDIT MOVIE</h2>)}

            <form  onSubmit={handleSubmit} onReset={handleReset}>
                <div className={styles.formRow}>
                    <div className={styles.formField}>
                        <label htmlFor='title'>TITLE</label>
                        <input onChange={handleInputChange} type="text" value={state.title} placeholder='Movie name' name='title' id='title' />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor='release_date'>RELEASE DATE</label>
                        <input onChange={handleDateChange} aria-label="Date" type="text" value={state.release_date} placeholder='Select Date' name='release_date' id='release_date'/>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formField}>
                        <label htmlFor='poster_path'>POSTER URL</label>
                        <input onChange={handleInputChange} type="text" value={state.poster_path} placeholder='https://' name='poster_path' id='poster_path'/>
                    </div>

                    <div className={styles.formField}>
                        <label htmlFor='vote_average'>RATING</label>
                        <input onChange={handleInputChange} type="text" value={state.vote_average} placeholder='IMDB Rating' id='vote_average' name='vote_average'/>
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formField}>
                        <label htmlFor="genres">GENRES</label>
                        <select onChange={handleChangeSelectGenre} name="genres" id="genres" multiple>
                            {GenreListArray.map(
                                (genre) => <option data-testid="genre" id={genre.id}
                                                   key={genre.id}>{genre.name}</option>
                            )}
                        </select>
                    </div>

                    <div className={styles.formField}>
                        <label htmlFor='runtime'>RUNTIME</label>
                        <input onChange={handleInputChange} type="text" value={state.runtime} placeholder='Duration' name='runtime'/>
                    </div>
                </div>

                <div className={textAreaRow}>
                    <div className={styles.formField}>
                        <label htmlFor='overview'>OVERVIEW</label>
                        <textarea onChange={handleInputChange} name="overview" id="overview" placeholder='Movie Description'
                                  value={state.overview}></textarea>
                    </div>
                </div>
                <div className={styles.buttonsRow}>
                    <input type="submit" value="Submit"/>
                    <input type="reset" value="Reset"/>
                </div>
            </form>
        </div>
    );
}

export default MovieForm;
