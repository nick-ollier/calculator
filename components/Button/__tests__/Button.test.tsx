import * as React from 'react';
import { render, screen } from '@testUtils/renderComponent';
import userEvent from '@testing-library/user-event';
import Button, { ButtonProps } from '@components/Button/Button';

const mockOnClick = jest.fn();

const renderComponent = (props?: Partial<ButtonProps>) => {
    const utils = render(
        <Button
            active={false}
            label='button'
            accessibleLabel='button'
            value='button'
            portrait
            onClick={() => null}
            {...props}
        />
    );

    return {
        ...utils,
        button: screen.queryByRole('button', { name: /button/i })
    };
};

describe('component: button', () => {
    describe('portrait', () => {
        describe('default', () => {
            it('renders', () => {
                const { container } = renderComponent();
                expect(container);
            });

            it('renders with correct classes', () => {
                const { button } = renderComponent();
                expect(button).toHaveClass('bg-gray-200 text-gray-500');
            });

            it('matches snapshot', () => {
                const { asFragment } = renderComponent();
                expect(asFragment()).toMatchSnapshot();
            });

            it("shouldn't fire callback on click when a callback isn't provided", () => {
                const { button } = renderComponent();

                userEvent.click(button);
                expect(mockOnClick).not.toHaveBeenCalled();
            });

            it('fires callback on click', () => {
                const { button } = renderComponent({ onClick: mockOnClick });

                userEvent.click(button);
                expect(mockOnClick).toHaveBeenCalled();
            });

            it('sanitizes label on render', () => {
                renderComponent({
                    label: "<script>console.log('not today!')</script>Hello!",
                    accessibleLabel:
                        "<script>console.log('not today!')</script>Hello!"
                });

                expect(
                    screen.getByRole('button', { name: /hello!/i })
                ).toBeInTheDocument();
            });

            it('updates button state on click, and again after timeout', () => {
                const setState = jest.fn();

                const useStateMock: any = (initState: any) => [
                    initState,
                    setState
                ];

                // window.setTimeout = jest.fn();

                jest.useFakeTimers();
                jest.spyOn(React, 'useState').mockImplementation(useStateMock);

                const { button } = renderComponent();

                userEvent.click(button);

                expect(setState).toHaveBeenCalledTimes(1);
                expect(setState).toHaveBeenCalledWith(true);
                jest.runAllTimers();
                expect(setState).toHaveBeenCalledTimes(2);
                expect(setState).toHaveBeenCalledWith(false);

                jest.clearAllMocks();
            });
        });

        describe('variants', () => {
            it('number - renders', () => {
                const { container } = renderComponent({ variant: 'number' });
                expect(container);
            });

            it('number - renders with correct classes', () => {
                const { button } = renderComponent({ variant: 'number' });
                expect(button).toHaveClass('bg-gray-400 text-gray-100');
            });

            it('number - matches snapshot', () => {
                const { asFragment } = renderComponent({ variant: 'number' });
                expect(asFragment()).toMatchSnapshot();
            });

            it('operator - renders', () => {
                const { container } = renderComponent({ variant: 'operator' });
                expect(container);
            });

            it('operator - renders with correct classes', () => {
                const { button } = renderComponent({ variant: 'operator' });
                expect(button).toHaveClass(
                    'bg-orange-200 text-gray-100 dark:bg-orange-100'
                );
            });

            it('operator - matches snapshot', () => {
                const { asFragment } = renderComponent({ variant: 'operator' });
                expect(asFragment()).toMatchSnapshot();
            });

            it('scientific - renders', () => {
                const { container } = renderComponent({
                    variant: 'scientific'
                });
                expect(container);
            });

            it('scientific - renders with correct classes', () => {
                const { button } = renderComponent({ variant: 'scientific' });
                expect(button).toHaveClass('bg-gray-500 text-gray-100');
            });

            it('scientific - matches snapshot', () => {
                const { asFragment } = renderComponent({
                    variant: 'scientific'
                });
                expect(asFragment()).toMatchSnapshot();
            });
        });

        describe('with props', () => {
            it('renders with correct span class', () => {
                const { button } = renderComponent({ span: 2 });
                expect(button).toHaveClass('col-span-2');
            });
        });
    });

    describe('landscape', () => {
        describe('default', () => {
            it('renders', () => {
                const { container } = renderComponent({ portrait: false });
                expect(container);
            });

            it('matches snapshot', () => {
                const { asFragment } = renderComponent({ portrait: false });
                expect(asFragment()).toMatchSnapshot();
            });
        });
    });
});
