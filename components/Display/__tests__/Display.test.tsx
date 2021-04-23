import { render, screen } from '@testUtils/renderComponent';
import Display, { DisplayProps } from '@components/Display/Display';

const renderComponent = (props?: Partial<DisplayProps>) => {
    const utils = render(<Display portrait {...props} />);

    return { ...utils };
};

describe('component: display', () => {
    describe('portrait', () => {
        describe('default', () => {
            it('renders', () => {
                const { container } = renderComponent();
                expect(container);
            });

            it('matches snapshot', () => {
                const { asFragment } = renderComponent();
                expect(asFragment()).toMatchSnapshot();
            });

            it('renders with default value: 0', () => {
                renderComponent();
                expect(screen.getByText('0')).toBeInTheDocument();
            });

            it('renders with class: text-6xl', () => {
                renderComponent();
                expect(screen.getByText('0')).toHaveClass('text-6xl');
            });
        });

        describe('with props', () => {
            it('renders', () => {
                const { container } = renderComponent({
                    displayValue: '12345678'
                });
                expect(container);
            });

            it('matches snapshot', () => {
                const { asFragment } = renderComponent({
                    displayValue: '12345678'
                });
                expect(asFragment()).toMatchSnapshot();
            });

            it('displays exponential number when displayValue length is greater or equal to 10', () => {
                renderComponent({ displayValue: '1234567890' });
                expect(screen.getByText('1.0e+0')).toBeInTheDocument();
            });

            it("renders with class: text-5xl when displayValue's length is > 7", () => {
                renderComponent({ displayValue: '12345678' });
                expect(screen.getByText('12,345,678')).toHaveClass('text-5xl');
                expect(screen.getByText('12,345,678')).not.toHaveClass(
                    'text-6xl'
                );
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

            it('renders with default value: 0', () => {
                renderComponent({ portrait: false });
                expect(screen.getByText('0')).toBeInTheDocument();
            });

            it('renders with class: text-4xl', () => {
                renderComponent({ portrait: false });
                expect(screen.getByText('0')).toHaveClass('text-4xl');
                expect(screen.getByText('0')).not.toHaveClass('text-5xl');
            });
        });

        describe('with props', () => {
            it('renders', () => {
                const { container } = renderComponent({
                    portrait: false,
                    displayValue: '12345678'
                });
                expect(container);
            });

            it('matches snapshot', () => {
                const { asFragment } = renderComponent({
                    portrait: false,
                    displayValue: '12345678'
                });
                expect(asFragment()).toMatchSnapshot();
            });

            it('displays correctly formatted number when displayValue length is greater or equal to 10', () => {
                renderComponent({
                    portrait: false,
                    displayValue: '1234567890'
                });
                expect(screen.getByText('1,234,567,890')).toBeInTheDocument();
            });

            it('renders with class: text-4xl regardless of displayValue length', () => {
                renderComponent({ portrait: false, displayValue: '12345678' });
                expect(screen.getByText('12,345,678')).toHaveClass('text-4xl');
                expect(screen.getByText('12,345,678')).not.toHaveClass(
                    'text-6xl'
                );
            });
        });
    });
});
