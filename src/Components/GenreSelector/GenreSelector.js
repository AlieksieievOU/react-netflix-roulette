import React from 'react';
import classNames from 'classnames';
const title = 'Genre Selector';

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
            <div className='genreSelectContainer'>
                <h2>{title}</h2>
                <div>
                    {this.state.genreList.map(
                        (genre) => <span data-testid="genre" id={genre.id}
                                         className={classNames({ active: genre.id === this.state.selected })}

                        onClick={()=>this.selectGenre(genre)} 
                        key={genre.id}>{genre.name}</span>
                    )}
                </div>
            </div>
        );
    }
}

export default GenreSelector;