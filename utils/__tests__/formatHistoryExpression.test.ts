import { formatHistoryExpression } from '@utils';

describe('util: formatHistoryExpression', () => {
    test.each`
        expression             | expected
        ${'1+1'}               | ${'1 + 1 ='}
        ${'1-1'}               | ${'1 - 1 ='}
        ${'1/1'}               | ${'1 / 1 ='}
        ${'1*1'}               | ${'1 * 1 ='}
        ${'1*1+1/1-1*2-2+2/2'} | ${'1 * 1 + 1 / 1 - 1 * 2 - 2 + 2 / 2 ='}
    `(
        'expression: $expression - returns: $expected',
        ({ expression, expected }) => {
            expect(formatHistoryExpression(expression)).toBe(expected);
        }
    );
});
