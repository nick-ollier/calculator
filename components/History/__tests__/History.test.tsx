import { render, screen } from '@testUtils/renderComponent';
import userEvent from '@testing-library/user-event';
import History, { HistoryProps } from '@components/History/History';

const mockClearHistory = jest.fn();
const mockCloseHistory = jest.fn();
let mockHistoryData = [{ id: '12345', expression: '1+1', value: '2' }];

const renderComponent = (props?: Partial<HistoryProps>) => {
    const utils = render(
        <History
            displayHistory
            history={mockHistoryData}
            clearHistory={mockClearHistory}
            closeHistory={mockCloseHistory}
            {...props}
        />
    );

    return {
        ...utils
    };
};

describe('component: history History', () => {
    it('renders', () => {
        const { container } = renderComponent();
        expect(container);
    });

    it('matches snapshot', () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });

    it('should fire closeHistory callback on click of close icon', () => {
        renderComponent();

        const closeHistoryButton = screen.getByRole('button', {
            name: /hide history/i
        });
        userEvent.click(closeHistoryButton);

        expect(mockCloseHistory).toHaveBeenCalled();
    });

    it('should fire clearHistory callback on click of close icon', () => {
        renderComponent();

        const clearHistoryButton = screen.getByRole('button', {
            name: /clear history/i
        });
        userEvent.click(clearHistoryButton);

        expect(mockCloseHistory).toHaveBeenCalled();
    });

    it('should render correct number of history items', () => {
        mockHistoryData = [
            { id: '1', expression: '1+1', value: '2' },
            { id: '2', expression: '2+3', value: '5' },
            { id: '3', expression: '20-22', value: '-2' }
        ];
        renderComponent({ history: mockHistoryData });

        const historyItems = screen.getAllByRole('presentation');

        expect(historyItems).toHaveLength(mockHistoryData.length);
    });

    it("shouldn't render history when displayHistory is false", () => {
        renderComponent({ displayHistory: false });

        const history = screen.queryByTestId('history');

        expect(history).not.toBeInTheDocument();
    });
});
