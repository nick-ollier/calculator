import { togglePlusMinus } from '@utils';

describe('util: togglePlusMinus', () => {
    test.each`
        expression           | expected
        ${'100'}             | ${'-100'}
        ${'-100'}            | ${'100'}
        ${'60+50'}           | ${'60+-50'}
        ${'60+-50'}          | ${'60+50'}
        ${'900*1000/20+999'} | ${'900*1000/20+-999'}
    `(
        'expression: $expression - returns: $expected',
        ({ expression, expected }) => {
            expect(togglePlusMinus(expression)).toBe(expected);
        }
    );
});
