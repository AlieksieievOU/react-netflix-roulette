import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieTile from './MovieTile';

jest.mock('./MovieTile.module.scss', () => ({
    movietile: 'movietile',
    movietileImage: 'movietileImage',
    info: 'info',
    infoRow: 'infoRow',
    headerH3: 'headerH3',
    releaseYear: 'release-year',
    genres: 'genres',
    subMenu: 'subMenu',
    menuButtonClose: 'menuButtonClose',
    menuList: 'menuList',
}));

describe('MovieTile component', () => {
    it('renders movie details and opens/closes context menu', () => {
        const mockMovie =  {
            name: "The Shawshank Redemption",
            releaseYear: "1994",
            genres: "Drama",
            imageUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        };

        const mockOnSelectMovieTile = jest.fn();

        render(<MovieTile movieTileItem={mockMovie} onSelectMovieTile={mockOnSelectMovieTile} />);

        expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.releaseYear)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.genres)).toBeInTheDocument();

        fireEvent.click(screen.queryByRole('movie-tile'));
        expect(mockOnSelectMovieTile).toHaveBeenCalledWith(mockMovie);

        expect(screen.queryByRole('showMenuButton')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('showMenuButton'));

        expect(screen.queryByRole('subMenu')).toBeInTheDocument();

        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();

        fireEvent.click(screen.queryByRole('hideMenuButton'));

        expect(screen.queryByRole('subMenu')).not.toBeInTheDocument();
    });
});
