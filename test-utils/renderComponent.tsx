import CalculatorProvider from '@context/CalculatorContext';
import { render } from '@testing-library/react';

const renderWrapper = (ui: React.ReactElement) => {
    const WithProviders = ({ children }) => {
        return <CalculatorProvider>{children}</CalculatorProvider>;
    };

    return render(ui, { wrapper: WithProviders });
};

export * from '@testing-library/react';
export { renderWrapper as render };
