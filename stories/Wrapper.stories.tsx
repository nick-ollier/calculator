import React from 'react';
import Wrapper from '../components/Wrapper/Wrapper';

export default {
    title: 'Components/Wrapper',
    component: Wrapper,
    parameters: {
        layout: 'centered'
    }
};

const Template = (args) => <Wrapper {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    darkMode: true,
    portrait: true
};
