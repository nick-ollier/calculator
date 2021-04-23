/* eslint-disable no-console */
import { renderHooks, act } from '@testUtils/renderHooks';
import userEvent from '@testing-library/user-event';
import { initialState } from '@context/CalculatorContext';

let result;

beforeEach(() => ({ result } = renderHooks(true)));

describe('hook: useKeyboardInput', () => {
    it('keyboardEvent: number', () => {
        act(() => {
            userEvent.keyboard('999');
        });

        expect(result.current.state).toEqual({
            ...initialState,
            displayValue: '999',
            expression: '999',
            hasChanged: true
        });
    });

    it('keyboardEvent: operator', () => {
        act(() => {
            userEvent.keyboard('2');
            userEvent.keyboard('*');
        });

        expect(result.current.state).toEqual({
            ...initialState,
            activeOperator: '*',
            displayValue: '2',
            expression: '2',
            hasChanged: true
        });

        act(() => {
            userEvent.keyboard('2');
        });

        expect(result.current.state).toEqual({
            ...initialState,
            displayValue: '2',
            expression: '2*2',
            hasChanged: true
        });
    });

    it('keyboardEvent: backspace', () => {
        act(() => {
            userEvent.keyboard('1');
            userEvent.keyboard('{backspace}');
        });

        expect(result.current.state).toEqual({
            ...initialState,
            hasChanged: true
        });
    });

    it('keyboardEvent: escape', () => {
        act(() => {
            userEvent.keyboard('1');
            userEvent.keyboard('{escape}');
        });

        expect(result.current.state).toEqual(initialState);
    });

    it('keyboardEvent: equals', () => {
        act(() => {
            userEvent.keyboard('1+1');
            userEvent.keyboard('=');
        });

        expect(result.current.state).toEqual({
            ...initialState,
            displayValue: '2',
            expression: '1+1',
            lastAction: '+1'
        });

        act(() => {
            userEvent.keyboard('=');
        });

        expect(result.current.state).toEqual({
            ...initialState,
            displayValue: '3',
            expression: '1+1+1',
            lastAction: '+1'
        });
    });

    it('keyboardEvent: plus minus', () => {
        act(() => {
            userEvent.keyboard('1');
            userEvent.keyboard('±');
        });

        expect(result.current.state).toEqual({
            ...initialState,
            displayValue: '-1',
            expression: '-1',
            hasChanged: true
        });
    });

    it('keyboardEvent: percent', () => {
        act(() => {
            userEvent.keyboard('60+50');
            userEvent.keyboard('%');
        });

        expect(result.current.state).toEqual({
            ...initialState,
            displayValue: '30',
            expression: '60+30',
            hasChanged: true
        });
    });

    it('keyboardEvent: log state', () => {
        console.log = jest.fn();

        act(() => {
            userEvent.keyboard('l');
        });

        expect(console.log).toHaveBeenCalledWith(
            'Current State:',
            initialState
        );
    });

    it('keyboardEvent: unhandled key', () => {
        act(() => {
            userEvent.keyboard('q');
        });

        expect(result.current.state).toEqual({
            ...initialState
        });
    });
});
