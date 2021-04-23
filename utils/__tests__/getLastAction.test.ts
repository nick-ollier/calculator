import { getLastAction } from '@utils';

describe('util: getLastAction', () => {
    test.each`
        expression             | expected
        ${'1+1'}               | ${'+1'}
        ${'1-1'}               | ${'-1'}
        ${'1/1'}               | ${'/1'}
        ${'1*1'}               | ${'*1'}
        ${'1*1+1/1-1*2-2+2/2'} | ${'/2'}
        ${'1'}                 | ${''}
    `(
        'expression: $expression - returns: $expected',
        ({ expression, expected }) => {
            expect(getLastAction(expression)).toBe(expected);
        }
    );
});
