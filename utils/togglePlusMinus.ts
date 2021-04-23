import { operatorRegex } from '@constants';

export const togglePlusMinus = (exp: string): string => {
    /* Multiply number by -1 to toggle positive/negative values */
    const toggle = (n) => String(n * -1);

    /**
     * Initial Value:
     * IF there are no current operators
     * - OR -
     * IF there are no current operators (minus the first character) AND the first character is '-'
     */
    if (
        !operatorRegex.test(exp) ||
        (!operatorRegex.test(exp.substr(1)) && exp.charAt(0) === '-')
    ) {
        return String(toggle(exp));
    }

    /**
     * Last Value:
     * Toggle the last number of the expression
     */
    const expArr = exp.split(operatorRegex).filter((i) => i !== '');

    /* Check if there are 2 operators in sequence at the end of the expression (negative number) */
    const isNegative =
        expArr.slice(-3, -1).filter((i) => i.match(operatorRegex)).length >= 2;

    return [
        ...(isNegative
            ? [...expArr.slice(0, -2), toggle(expArr.slice(-2).join(''))]
            : [...expArr.slice(0, -1), toggle(expArr.slice(-1).join(''))])
    ].join('');
};
