import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react';
import GenreSelector from './GenreSelector';
import {GenreListArray} from "../../data";

const onSelectGenre = function (genre) {
    console.log(genre)
}
const defaultSelectedGenre = 0;

describe('Test Genre Selector Component', () => {
    test('Test that component renders all genres passed in props', () => {
        render(<GenreSelector defaultSelectedGenre={defaultSelectedGenre} genreList={GenreListArray} onSelectGenre={onSelectGenre}/>);
        const genreListElements = screen.getAllByTestId('genre');
        expect(genreListElements.length).toEqual(GenreListArray.length);
    });

    test('Test that component highlights a selected genre passed in props', () => {
        render(<GenreSelector defaultSelectedGenre={defaultSelectedGenre} genreList={GenreListArray}
                              onSelectGenre={onSelectGenre}/>);
        const genreLabels = screen.getAllByTestId('genre');
        const selectedGenreItem = genreLabels.filter(c => c.classList.contains('active')).reduce(c => c);
        expect(parseInt(selectedGenreItem.id)).toEqual(parseInt(defaultSelectedGenre));
    })

    test('Test that after a click event on a genre button component calls "onChange" callback and passes correct genre in arguments', () => {
        const onSelectGenre = jest.fn((e) => {
        });
        render(<GenreSelector defaultSelectedGenre={defaultSelectedGenre} genreList={GenreListArray}
                              onSelectGenre={onSelectGenre}/>);
        const genreLabels = screen.getAllByTestId('genre');
        const selectedGenreItem = genreLabels.filter(c => c.classList.contains('active')).reduce(c => c);
        fireEvent.click(selectedGenreItem);

        expect(onSelectGenre).toHaveBeenCalled();
        expect(onSelectGenre).toHaveBeenLastCalledWith({id:0, name: 'all'});
    })
});
