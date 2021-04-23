import React from 'react';
import History from '../components/History/History';

export default {
    title: 'Components/History',
    component: History,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
};

const Template = (args) => <History {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    primary: true,
    label: 'History'
};
