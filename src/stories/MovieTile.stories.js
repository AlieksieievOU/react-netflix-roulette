import MovieTile from '../Components/MovieTile/MovieTile';
import {useState} from "react";

export default {
    title: 'Components / MovieTile',
    component: MovieTile,
}

const onSelectMovieTile = function (selectedMovie) {
    console.log(selectedMovie)
}

const Template = (args) => <MovieTile {...args}/>;

export const Default = Template.bind({});
Default.args = {
    movieTileItem: {
        name: "The Shawshank Redemption",
        releaseYear: "1994",
        genres: "Drama",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    onSelectMovieTile
};

export const DifferentMovie = Template.bind({});
DifferentMovie.args = {
    movieTileItem: {
        name: "The Godfather",
        releaseYear: "1972",
        genres: "Crime, Drama",
        imageUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    },
    onSelectMovieTile
};