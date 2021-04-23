import { render, screen } from '@testUtils/renderComponent';
import userEvent from '@testing-library/user-event';
import Item, { ItemProps } from '@components/History/Item';

const renderComponent = (props?: Partial<ItemProps>) => {
    const utils = render(<Item value='2' expression='1+1' {...props} />);

    return {
        ...utils
    };
};

describe('component: history item', () => {
    it('renders', () => {
        const { container } = renderComponent();
        expect(container);
    });

    it('matches snapshot', () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });

    it('should copy value to clipboard on click of expression/value', () => {
        Object.assign(navigator, {
            clipboard: {
                writeText: () => null
            }
        });

        jest.spyOn(navigator.clipboard, 'writeText');

        renderComponent();

        const sum = screen.getByRole('presentation', {
            name: /1\+1=2/i
        });

        userEvent.click(sum);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('2');
    });
});
