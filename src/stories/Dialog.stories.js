import Dialog from '../Components/Dialog/Dialog';
import MovieForm from '../Components/MovieForm/MovieForm';
import MovieDelete from "../Components/MovieDelete/MovieDelete";
import React from "react";

export default {
    title: 'Components / Dialog',
    component: Dialog,
    subcomponents: {MovieForm, MovieDelete}
}

let showModal = false;

const mockFormContent = {
    name: 'The Shawshank Redemption',
    releaseYear: 1994,
    imageUrl: 'https://example.com/poster.jpg',
    imdbRating: 9.3,
    genres: ['Action'],
    duration: '142min',
    description: 'A timeless story of hope and redemption.',
};

const onClose = () => {
    showModal = false;
};

export const AddMovie = {
    render: (args) => (
        <Dialog {...args}>
            <MovieForm name="movie-form" formContent={mockFormContent} action={'add'}/>
        </Dialog>
    ),
};

AddMovie.args = {
    showModal: true,
    onClose: onClose
};

export const EditMovie = {
    render: (args) => (
        <Dialog {...args}>
            <MovieForm name="movie-form" formContent={mockFormContent} action={'edit'}/>
        </Dialog>
    ),
};

EditMovie.args = {
    showModal: true,
    onClose: onClose
};

export const DeleteMovie = {
    render: (args) => (
        <Dialog {...args}>
            <MovieDelete name="movie-delete" formContent={mockFormContent} action={'delete'}/>
        </Dialog>
    ),
};

DeleteMovie.args = {
    showModal: true,
    onClose: onClose
};