import React from 'react';
import Display from '../components/Display/Display';

export default {
    title: 'Components/Display'
};

const Template = (args) => <Display {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    number: 0
};
