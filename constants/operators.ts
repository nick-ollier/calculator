export const operators = ['+', '-', '/', '*'];

export const operatorRegex = new RegExp(`(\\${operators.join('|\\')})`, 'g');
