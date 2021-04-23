import { handlePercent } from '@utils';

describe('util: handlePercent', () => {
    test.each`
        expression  | expected
        ${'100'}    | ${{ displayValue: '1', expression: '1' }}
        ${'99'}     | ${{ displayValue: '0.99', expression: '0.99' }}
        ${'60+50'}  | ${{ displayValue: '30', expression: '60+30' }}
        ${'900+2'}  | ${{ displayValue: '18', expression: '900+18' }}
        ${'90+2.5'} | ${{ displayValue: '2.25', expression: '90+2.25' }}
    `(
        'expression: $expression - returns: $expected',
        ({ expression, expected }) => {
            expect(handlePercent(expression)).toStrictEqual(expected);
        }
    );
});
