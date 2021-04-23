import { render, screen } from '@testUtils/renderComponent';
import userEvent from '@testing-library/user-event';
import Toggle, { ToggleProps } from '@components/History/Toggle';

const mockOnClick = jest.fn();

const renderComponent = (props?: Partial<ToggleProps>) => {
    const utils = render(<Toggle onClick={mockOnClick} {...props} />);

    return {
        ...utils
    };
};

describe('component: history toggle', () => {
    it('renders', () => {
        const { container } = renderComponent();
        expect(container);
    });

    it('matches snapshot', () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });

    it('should fire callback on click', () => {
        renderComponent();

        const toggle = screen.getByRole('button', {
            name: /history toggle/i
        });

        userEvent.click(toggle);
        expect(mockOnClick).toHaveBeenCalled();
    });
});
