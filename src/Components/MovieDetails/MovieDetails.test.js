import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';

const mockMovie =  {
    name: "The Shawshank Redemption",
    releaseYear: "1994",
    imdbRating: "9.3",
    genres: "Drama",
    duration: "142 min",
    description: "Two imprisoned men bond over a number of years",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
};

describe('MovieDetails component', () => {
    it('renders movie details when a movie is provided', () => {
        render(<MovieDetails selectedMovie={mockMovie} />);
        expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.imdbRating)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.genres)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.releaseYear)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.duration)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
        const image = screen.getByTestId('imgPoster');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('alt', 'imgPoster');
    });

    it('renders nothing when no movie is provided', () => {
        render(<MovieDetails />);
        expect(screen.queryByText(mockMovie.name)).not.toBeInTheDocument();
    });
});
