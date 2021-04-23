import { render, screen } from '@testUtils/renderComponent';
import userEvent from '@testing-library/user-event';
import { keypadExtended, keypadDefault } from '@constants';
import Keypad, { ExtendedProps } from '@components/Keypad/Keypad';

const renderComponent = (props?: Partial<ExtendedProps>) => {
    const utils = render(<Keypad portrait {...props} />);

    return {
        ...utils,
        keypad: screen.getByTestId('keypad')
    };
};

const mockHandleNumber = jest.fn();
const mockHandleClear = jest.fn();
const mockHandlePlusMinus = jest.fn();
const mockHandlePercent = jest.fn();
const mockHandleOperator = jest.fn();
const mockHandleBackspace = jest.fn();
const mockHandleEquals = jest.fn();

jest.mock('@hooks/useCalculator', () => ({
    useCalculator: () => ({
        state: {
            displayValue: '',
            activeOperator: null,
            hasDecimal: false,
            expression: '',
            lastAction: '',
            hasChanged: false
        },
        handleNumber: mockHandleNumber,
        handleClear: mockHandleClear,
        handlePlusMinus: mockHandlePlusMinus,
        handlePercent: mockHandlePercent,
        handleOperator: mockHandleOperator,
        handleBackspace: mockHandleBackspace,
        handleEquals: mockHandleEquals
    })
}));

describe('component: keypad', () => {
    describe('portrait', () => {
        describe('default', () => {
            it('renders', () => {
                const { container } = renderComponent();
                expect(container);
            });

            it('renders with correct classes', () => {
                const { keypad } = renderComponent();
                expect(keypad).toHaveClass(
                    'grid-cols-4 gap-2 mb-6 px-1 text-2xl'
                );
            });

            it('renders correct number of keypad buttons', () => {
                renderComponent();
                expect(screen.getAllByRole('button').length).toEqual(
                    keypadDefault.length
                );
            });

            it('matches snapshot', () => {
                const { asFragment } = renderComponent();
                expect(asFragment()).toMatchSnapshot();
            });
        });

        describe('button callbacks', () => {
            it('handleNumber', () => {
                renderComponent();
                const button = screen.getByRole('button', {
                    name: /1/i
                });

                userEvent.click(button);

                expect(mockHandleNumber).toHaveBeenCalledWith('1');
                expect(mockHandleNumber).toHaveBeenCalledTimes(1);
            });

            it('handleClear', () => {
                renderComponent();
                const button = screen.getByRole('button', {
                    name: /clear/i
                });

                userEvent.click(button);

                expect(mockHandleClear).toHaveBeenCalledWith();
                expect(mockHandleClear).toHaveBeenCalledTimes(1);
            });

            it('handlePlusMinus', () => {
                renderComponent();
                const button = screen.getByRole('button', {
                    name: /plus \/ minus/i
                });

                userEvent.click(button);

                expect(mockHandlePlusMinus).toHaveBeenCalledWith();
                expect(mockHandlePlusMinus).toHaveBeenCalledTimes(1);
            });

            it('handlePercent', () => {
                renderComponent();
                const button = screen.getByRole('button', {
                    name: /percent/i
                });

                userEvent.click(button);

                expect(mockHandlePercent).toHaveBeenCalledWith();
                expect(mockHandlePercent).toHaveBeenCalledTimes(1);
            });

            it('handleOperator', () => {
                renderComponent();
                const button = screen.getByRole('button', {
                    name: /multiply/i
                });

                userEvent.click(button);

                expect(mockHandleOperator).toHaveBeenCalledWith('*');
                expect(mockHandleOperator).toHaveBeenCalledTimes(1);
            });

            it('handleEquals', () => {
                renderComponent();
                const button = screen.getByRole('button', {
                    name: /equals/i
                });

                userEvent.click(button);

                expect(mockHandleEquals).toHaveBeenCalledWith();
                expect(mockHandleEquals).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('landscape', () => {
        describe('default', () => {
            it('renders', () => {
                const { container } = renderComponent({ portrait: false });
                expect(container);
            });

            it('renders with correct classes', () => {
                const { keypad } = renderComponent({ portrait: false });
                expect(keypad).toHaveClass('grid-cols-10 gap-1 px-4');
            });

            it('renders correct number of keypad buttons', () => {
                renderComponent({ portrait: false });
                expect(screen.getAllByRole('button').length).toEqual(
                    keypadExtended.length
                );
            });

            it('matches snapshot', () => {
                const { asFragment } = renderComponent({ portrait: false });
                expect(asFragment()).toMatchSnapshot();
            });
        });
    });
});
