import MovieDetails from '../Components/MovieDetails/MovieDetails';
import React, {useState} from "react";

export default {
    title: 'Components / MovieDetails',
    component: MovieDetails,
}

const Template = args => <MovieDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
    selectedMovie: {
        name: "The Shawshank Redemption",
        releaseYear: "1994",
        imdbRating: "9.3",
        genres: "Drama",
        duration: "142 min",
        description: "Two imprisoned men bond over a number of years",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    }
};

export const DifferentMovie = Template.bind({});
DifferentMovie.args = {
    selectedMovie: {
        name: "The Godfather",
        releaseYear: "1972",
        duration: "175 min",
        genres: "Crime, Drama",
        description: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        imdbRating: "9.2"
    }
};

