import { formatDisplayValue } from '@utils';

describe('util: formatDisplayValue', () => {
    test.each`
        displayValue  | expected
        ${1}          | ${1}
        ${999999999}  | ${999999999}
        ${9999999999} | ${'1.0e+10'}
        ${1234567890} | ${'1.2e+9'}
    `(
        'displayValue: $displayValue - returns: $expected',
        ({ displayValue, expected }) => {
            expect(formatDisplayValue(displayValue)).toBe(expected);
        }
    );
});
