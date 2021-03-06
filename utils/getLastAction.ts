import { operatorRegex } from '@constants';

export const getLastAction = (exp: string): string => {
    const expressionArr = exp.split(operatorRegex);

    if (expressionArr.length < 3) return '';

    return expressionArr.slice(-2).join('');
};
