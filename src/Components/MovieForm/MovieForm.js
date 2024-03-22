import React, {useState} from 'react';
import {GenreListArray} from '../../data';
import styles from './MovieForm.module.scss';

const MovieForm = ({formContent, action}) => {
    formContent = action === 'edit' || action === 'delete' ? formContent : {};
    const [name, setName] = useState(formContent?.name ? formContent?.name : '');
    const [releaseYear, setReleaseYear] = useState(formContent?.releaseYear ? formContent?.releaseYear : '');
    const [imdbRating, setImdbRating] = useState(formContent?.imdbRating ? formContent?.imdbRating : '');
    const [genres, setGenres] = useState(formContent?.genres ? formContent?.genres : []);
    const [duration, setDuration] = useState(formContent?.duration ? formContent?.duration : '');
    const [description, setDescription] = useState(formContent?.description ? formContent?.description : '');
    const [imageUrl, setImgUrl] = useState(formContent?.imageUrl ? formContent?.imageUrl : '');

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleReset = (event) => {
        event.preventDefault();

        setName('');
        setReleaseYear('');
        setImdbRating('');
        setGenres([]);
        setDuration('');
        setDescription('');
        setImgUrl('');
    }

    const onChange = (e) => {

    }

    const textAreaRow = styles.formRow + " " + styles.textareaRow;

    return (
        <div className={styles.modalContent}>
            {action === 'add' ? (<h2>ADD MOVIE</h2>) : (<h2>EDIT MOVIE</h2>)}

            <form  onSubmit={handleSubmit} onReset={handleReset}>
                <div className={styles.formRow}>
                    <div className={styles.formField}>
                        <label htmlFor={name}>TITLE</label>
                        <input onChange={onChange} type="text" value={name} placeholder='Movie name' name='name'/>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor={releaseYear}>RELEASE DATE</label>
                        <input onChange={onChange} aria-label="Date" type="text" value={releaseYear} placeholder='Select Date' name='releaseYear'/>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formField}>
                        <label htmlFor={imageUrl}>POSTER URL</label>
                        <input onChange={onChange} type="text" value={imageUrl} placeholder='https://' name='imageUrl'/>
                    </div>

                    <div className={styles.formField}>
                        <label htmlFor={imdbRating}>RATING</label>
                        <input onChange={onChange} type="text" value={imdbRating} placeholder='IMDB Rating' name='imdbRating'/>
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formField}>
                        <label htmlFor={genres}>GENRES</label>
                        <select onChange={onChange} name="genres" id="genres" multiple>
                            {GenreListArray.map(
                                (genre) => <option data-testid="genre" id={genre.id}
                                                   key={genre.id}>{genre.name}</option>
                            )}
                        </select>
                    </div>

                    <div className={styles.formField}>
                        <label htmlFor={duration}>RUNTIME</label>
                        <input onChange={onChange} type="text" value={duration} placeholder='Duration' name='duration'/>
                    </div>
                </div>

                <div className={textAreaRow}>
                    <div className={styles.formField}>
                        <label htmlFor={description}>OVERVIEW</label>
                        <textarea onChange={onChange} name="description" id="description" placeholder='Movie Description'
                                  value={description}></textarea>
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