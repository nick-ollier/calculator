import { renderHooks, act } from '@testUtils/renderHooks';
import { initialState } from '@context/CalculatorContext';

let result;

describe('hook: useCalculator', () => {
    describe('portrait', () => {
        beforeEach(() => ({ result } = renderHooks(true)));

        it('should have an initial state', () => {
            expect(result.current.state).toEqual(initialState);
        });

        it('fn: handleNumber', () => {
            act(() => result.current.handleNumber('111111111'));
            expect(result.current.state).toEqual({
                ...initialState,
                displayValue: '111111111',
                expression: '111111111',
                hasChanged: true
            });

            act(() => {
                result.current.handleNumber('9');
            });

            expect(result.current.state).toEqual({
                ...initialState,
                displayValue: '111111111',
                expression: '111111111',
                hasChanged: true
            });
        });

        it('fn: handleNumber - decimal', () => {
            act(() => {
                result.current.handleNumber('1');
                result.current.handleNumber('.');
                result.current.handleNumber('1');
            });
            expect(result.current.state).toEqual({
                ...initialState,
                displayValue: '1.1',
                expression: '1.1',
                hasDecimalPoint: true,
                hasChanged: true
            });

            act(() => {
                result.current.handleNumber('.');
                result.current.handleNumber('1');
            });

            expect(result.current.state).toEqual({
                ...initialState,
                displayValue: '1.11',
                expression: '1.11',
                hasDecimalPoint: true,
                hasChanged: true
            });
        });

        it('fn: handleNumber - leading zeros', () => {
            act(() => {
                result.current.handleNumber('0');
                result.current.handleNumber('0');
                result.current.handleNumber('1');
            });
            expect(result.current.state).toEqual({
                ...initialState,
                displayValue: '1',
                expression: '1',
                hasChanged: true
            });
        });

        it('fn: handleOperator', () => {
            act(() => {
                result.current.handleNumber('1');
                result.current.handleOperator('*');
            });
            expect(result.current.state).toEqual({
                ...initialState,
                activeOperator: '*',
                displayValue: '1',
                expression: '1',
                hasChanged: true
            });
        });

        it('fn: handleOperator w/ expression', () => {
            act(() => {
                result.current.handleNumber('2');
                result.current.handleOperator('*');
                result.current.handleNumber('2');
            });
            expect(result.current.state).toEqual({
                ...initialState,
                activeOperator: null,
                displayValue: '2',
                expression: '2*2',
                hasChanged: true
            });
        });

        it('fn: handleOperator - initial state', () => {
            act(() => result.current.handleOperator('+'));
            expect(result.current.state).toEqual({
                ...initialState,
                activeOperator: '+',
                displayValue: '0',
                expression: '0',
                hasChanged: true
            });

            act(() => result.current.handleNumber('2'));
            expect(result.current.state).toEqual({
                ...initialState,
                activeOperator: null,
                displayValue: '2',
                expression: '0+2',
                hasChanged: true
            });
        });

        it('fn: handleClear', () => {
            act(() => {
                result.current.handleNumber('22');
                result.current.handleOperator('+');
                result.current.handleNumber('44');
                result.current.handleClear();
            });
            expect(result.current.state).toEqual(initialState);
        });

        it('fn: handlePlusMinus', () => {
            act(() => {
                result.current.handleNumber(9);
                result.current.handlePlusMinus();
            });
            expect(result.current.state).toEqual({
                ...initialState,
                displayValue: '-9',
                expression: '-9',
                hasChanged: true
            });
        });

        it('fn: handlePlusMinus - initial state', () => {
            act(() => result.current.handlePlusMinus());
            expect(result.current.state).toEqual(initialState);
        });

        it('fn: handlePercent', () => {
            act(() => {
                result.current.handleNumber(22);
                result.current.handlePercent();
            });
            expect(result.current.state).toEqual({
                ...initialState,
                displayValue: '0.22',
                expression: '0.22',
                hasChanged: true
            });
        });

        it('fn: handlePercent - initial state', () => {
            act(() => result.current.handlePercent());
            expect(result.current.state).toEqual(initialState);
        });

        it('fn: handleBackspace', () => {
            act(() => result.current.handleNumber('12345'));
            act(() => result.current.handleBackspace());

            expect(result.current.state).toEqual({
                ...initialState,
                displayValue: '1234',
                expression: '1234',
                hasChanged: true
            });
        });

        it('fn: handleBackspace - initial state', () => {
            act(() => result.current.handleBackspace());
            expect(result.current.state).toEqual(initialState);
        });

        it('fn: handleBackspace w/ activeOperator', () => {
            act(() => {
                result.current.handleNumber('12345');
                result.current.handleOperator('+');
            });
            act(() => result.current.handleBackspace());

            expect(result.current.state).toEqual({
                ...initialState,
                activeOperator: '+',
                displayValue: '12345',
                expression: '12345',
                hasChanged: true
            });
        });

        it('fn: handleEquals', () => {
            act(() => {
                result.current.handleNumber('1');
                result.current.handleOperator('+');
                result.current.handleNumber('1');
                result.current.handleEquals();
            });

            expect(result.current.state).toEqual({
                ...initialState,
                displayValue: '2',
                expression: '1+1',
                lastAction: '+1'
            });
        });

        it('fn: handleEquals - initial state', () => {
            act(() => result.current.handleEquals());

            expect(result.current.state).toEqual(initialState);
        });

        it('fn: handleEquals w/ lastAction', () => {
            act(() => {
                result.current.handleNumber('2');
                result.current.handleOperator('*');
                result.current.handleNumber('2');
                result.current.handleEquals();
                result.current.handleEquals();
                result.current.handleEquals();
                result.current.handleEquals();
                result.current.handleEquals();
            });

            expect(result.current.state).toEqual({
                ...initialState,
                displayValue: '64',
                expression: '2*2*2*2*2*2',
                lastAction: '*2'
            });
        });

        it('fn: handleScientific', () => {
            act(() => result.current.handleScientific());

            expect(result.current.state).toEqual(initialState);
        });

        it('fn: unhandled dispatch', () => {
            act(() =>
                result.current.dispatch({
                    type: 'PROBABLY_NOT_GONNA_WORK_TBH'
                })
            );

            expect(result.error.message).toBe(
                "UNHANDLED TYPE: PROBABLY_NOT_GONNA_WORK_TBH - Oops! You probably didn't mean to do that!"
            );
        });
    });

    describe('landscape', () => {
        beforeEach(() => ({ result } = renderHooks(false)));

        it('fn: handleNumber', () => {
            act(() => result.current.handleNumber('111111111'));
            expect(result.current.state).toEqual({
                ...initialState,
                displayValue: '111111111',
                expression: '111111111',
                hasChanged: true
            });

            act(() => {
                result.current.handleNumber('999');
            });

            expect(result.current.state).toEqual({
                ...initialState,
                displayValue: '111111111999',
                expression: '111111111999',
                hasChanged: true
            });
        });
    });
});
