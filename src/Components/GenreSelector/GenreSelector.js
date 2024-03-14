import React from 'react';
import classNames from 'classnames';
import styles from './GenreSelector.module.scss';
let cx = classNames.bind(styles);
class GenreSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: parseInt(props.defaultSelectedGenre),
            genreList: props.genreList
        };
    }

    selectGenre(genre){
        this.setState(function (prevState) {
            return {
                ...prevState,
                selected: genre.id
            }
        });
        this.props.onSelectGenre(genre)
    };

    render() {
        return (
            <div className={styles.genreSelectContainer}>
                <div className={styles.genreWrapper}>
                    {this.state.genreList.map(
                        (genre) => <span data-testid="genre" id={genre.id}
                                         className={cx({ [styles.active] : genre.id === this.state.selected })}

                        onClick={()=>this.selectGenre(genre)} 
                        key={genre.id}>{genre.name}</span>
                    )}
                </div>
            </div>
        );
    }
}

export default GenreSelector;