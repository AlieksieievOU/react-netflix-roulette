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
        const _self = this;
        _self.state.selected = genre.id;
        _self.setState(_self.state);
        _self.props.onSelectGenre(genre)
    };

    render() {
        return (
            <div className='genreSelectContainer'>
                <h2>{title}</h2>
                <div>
                    {this.state.genreList.map(
                        (genre) => <span
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