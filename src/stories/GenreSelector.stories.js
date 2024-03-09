import GenreSelector from '../Components/GenreSelector/GenreSelector';
import {GenreListArray} from "../data";

export default {
    title: 'Components / GenreSelector',
    component: GenreSelector,
}

const onSelectGenre = function (genre) {
    console.log(genre)
}
const genreList =
    [
        {id: 0, name: 'all'},
        {id: 1, name: 'documentary'},
        {id: 2, name: 'comedy'},
        {id: 3, name: 'horror'},
        {id: 4, name: 'crime'}
    ];
const Template = args => <GenreSelector {...args} />;
export const Default = Template.bind({});
Default.args = {
    genreList: genreList,
    onSelectGenre,
    defaultSelectedGenre: 0
};

export const DocumentaryByDefault = Template.bind({});
DocumentaryByDefault.args = {
    genreList: genreList,
    onSelectGenre,
    defaultSelectedGenre:  1
};

export const ComedyByDefault = Template.bind({});
ComedyByDefault.args = {
    genreList: genreList,
    onSelectGenre,
    defaultSelectedGenre: 2,
};


