import SortControl from '../Components/SortControl/SortControl';

export default {
    title: 'Components / SortControl',
    component: SortControl,
}

const onSortControl = function (SortControl) {
    console.log(SortControl)
}

const SortControlArray = [
    {id: 0, name: 'Release Date'},
    {id: 1, name: 'Title'}
];

const Template = args => <SortControl {...args} />;

export const Default = Template.bind({});
Default.args = {
    defaultSelectedSortControl:0,
    SortControl: SortControlArray,
    onSortControl
};

export const SortByTitle = Template.bind({});
SortByTitle.args = {
    defaultSelectedSortControl:1,
    SortControl: SortControlArray,
    onSortControl
};