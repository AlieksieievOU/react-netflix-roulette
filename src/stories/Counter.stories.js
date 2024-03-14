import Counter  from '../Components/Counter/Counter';
export default {
    title: 'Components / Counter Component',
    component: Counter,
}

const Template = args => <Counter {...args}/>;

export const Default = Template.bind({});
Default.args = {
    initialValue: 0
}

export const DefaultValueOne = Template.bind({});
DefaultValueOne.args = {
    initialValue: 1
}

export const DefaultValueMinusOne = Template.bind({});
DefaultValueMinusOne.args = {
    initialValue: -1
}


