import { useEffect } from 'react';
import { useCalculator } from '@hooks';
import { numbers, operators, KEYS } from '@constants';
import { Numbers, Operators } from '@appTypes';

export const useKeyboardInput = (portrait: boolean): void => {
    const {
        state,
        handleNumber,
        handleClear,
        handlePlusMinus,
        handlePercent,
        handleOperator,
        handleBackspace,
        handleEquals
    } = useCalculator(portrait);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (
                !numbers.includes(e.key) &&
                !operators.includes(e.key) &&
                !Object.values(KEYS).includes(e.key as KEYS)
            )
                return;

            if (numbers.includes(e.key)) return handleNumber(e.key as Numbers);

            if (operators.includes(e.key))
                return handleOperator(e.key as Operators);

            switch (e.key) {
                case KEYS.BACKSPACE:
                    handleBackspace();
                    break;
                case KEYS.ESCAPE:
                    handleClear();
                    break;
                case KEYS.EQUALS:
                    handleEquals();
                    break;
                case KEYS.PERCENT:
                    handlePercent();
                    break;
                case KEYS.PLUS_MINUS:
                    handlePlusMinus();
                    break;
                case KEYS.LOG_STATE:
                    console.log('Current State:', state);
                    break;
            }
        };

        window.addEventListener('keydown', handler);

        return () => window.removeEventListener('keydown', handler);
    }, [portrait, state]);
};

export default useKeyboardInput;
