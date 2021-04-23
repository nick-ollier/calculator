import { operatorRegex } from '@constants';
import { evaluate } from 'mathjs';

export const handlePercent = (
    exp: string
): { displayValue: string; expression: string } => {
    /* Divide number by 100 to get percentage */
    const toPercent = (n) => n / 100;

    const expArr = exp.split(operatorRegex).filter((i) => i !== '');

    /**
     * Initial Value:
     * If there's only a single item in the expression
     */
    if (expArr.length === 1) {
        return {
            displayValue: String(toPercent(exp)),
            expression: String(toPercent(exp))
        };
    }

    /**
     * Last Value:
     * Update the displayValue to show the requested percentage of the previous number (eg: 60 + 50% would display 30)
     * Update the expression to show actual percentage value (eg: 60 + 50% would display 60 + 30)
     */
    const sumStart = Number(expArr.slice(0, -2).join(''));
    const percentageValue = String(
        evaluate(sumStart * toPercent(expArr.slice(-1)))
    );

    return {
        displayValue: percentageValue,
        expression: `${expArr.slice(0, -1).join('')}${percentageValue}`
    };
};
