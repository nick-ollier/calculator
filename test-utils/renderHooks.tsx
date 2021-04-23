import { renderHook } from '@testing-library/react-hooks';
import CalculatorProvider from '@context/CalculatorContext';
import { useCalculator, useKeyboardInput } from '@hooks';

const renderHooks = (portrait: boolean) => {
    const wrapper = ({ children }) => (
        <CalculatorProvider>{children}</CalculatorProvider>
    );

    const { result } = renderHook(
        () => {
            useKeyboardInput(portrait);
            return useCalculator(portrait);
        },
        { wrapper }
    );

    return { result };
};

export * from '@testing-library/react-hooks';
export { renderHooks };
