import SearchForm from '../Components/SearchForm/SearchForm';

export default {
    title: 'Components / SearchForm',
    component: SearchForm,
}

const onSearch = function (input) {
    console.log(input);
}

const Template = args => <SearchForm {...args} />;

export const Default = Template.bind({});
Default.args = {
    onSearch,
    searchQuery: 'Drama'
};
export const SearchQueryIsComedy = Template.bind({});
SearchQueryIsComedy.args = {
    onSearch,
    searchQuery: 'comedy'
};