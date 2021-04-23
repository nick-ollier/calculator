import { useContext } from 'react';
import { CalculatorContext } from '@context/CalculatorContext';
import { Numbers, Operators } from '@appTypes';

export const useCalculator = (portrait: boolean) => {
    const { state, dispatch, history, setHistory } = useContext(
        CalculatorContext
    );

    const handleNumber = (number: Numbers) => {
        const maxLength = portrait ? 9 : 15;

        dispatch({ type: 'NUMBER', payload: { number, maxLength } });
    };

    const handleOperator = (operator: Operators) => {
        dispatch({ type: 'OPERATOR', payload: operator });
    };

    const handleClear = () => {
        dispatch({ type: 'CLEAR' });
    };

    const handlePlusMinus = () => {
        dispatch({ type: 'PLUS_MINUS' });
    };

    const handlePercent = () => {
        dispatch({ type: 'PERCENT' });
    };

    const handleBackspace = () => {
        if (state.activeOperator) return;
        dispatch({ type: 'BACKSPACE' });
    };

    const handleEquals = () => {
        dispatch({ type: 'EQUALS' });
    };

    /* istanbul ignore next */
    const handleScientific = () => {
        dispatch({ type: 'SCIENTIFIC' });
    };

    return {
        state,
        dispatch,
        history,
        setHistory,
        handleNumber,
        handleClear,
        handlePlusMinus,
        handlePercent,
        handleOperator,
        handleBackspace,
        handleScientific,
        handleEquals
    };
};

export default useCalculator;
