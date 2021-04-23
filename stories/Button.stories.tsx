import React from 'react';
import Button from '../components/Button/Button';

export default {
    title: 'Components/Button',
    component: Button
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: '%'
};

export const Number = Template.bind({});
Number.args = { variant: 'number', label: '7' };

export const Operator = Template.bind({});
Operator.args = { variant: 'operator', label: '÷', active: false };

export const Scientific = Template.bind({});
Scientific.args = { variant: 'scientific', label: 'x<sup>2</sup>' };
