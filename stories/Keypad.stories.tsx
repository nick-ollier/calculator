import React from 'react';
import CalculatorProvider from '../context/CalculatorContext';
import Keypad from '../components/Keypad/Keypad';

export default {
    title: 'Components/Keypad/Keypad'
};

const Template = (args) => (
    <CalculatorProvider>
        <Keypad {...args} />
    </CalculatorProvider>
);

export const Default = Template.bind({});
Default.args = {
    portrait: true
};
