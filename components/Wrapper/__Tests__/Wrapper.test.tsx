import { render } from '@testUtils/renderComponent';
import 'jest-styled-components';
import Wrapper, { WrapperProps } from '@components/Wrapper/Wrapper';

const renderComponent = (props?: Partial<WrapperProps>) => {
    const utils = render(
        <Wrapper portrait darkMode={false} overlay={false} {...props} />
    );

    return {
        ...utils
    };
};

describe('component: wrapper', () => {
    describe('portrait', () => {
        it('renders', () => {
            const { container } = renderComponent();
            expect(container);
        });

        it('renders with overlay', () => {
            const { container } = renderComponent({ overlay: true });
            expect(container);
        });

        it('matches snapshot', () => {
            const { asFragment } = renderComponent();
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with overlay', () => {
            const { asFragment } = renderComponent({ overlay: true });
            expect(asFragment()).toMatchSnapshot();
        });
    });

    describe('landscape', () => {
        it('renders', () => {
            const { container } = renderComponent({ portrait: false });
            expect(container);
        });

        it('renders with overlay', () => {
            const { container } = renderComponent({
                portrait: false,
                overlay: true
            });
            expect(container);
        });

        it('matches snapshot', () => {
            const { asFragment } = renderComponent({ portrait: false });
            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot with overlay', () => {
            const { asFragment } = renderComponent({
                portrait: false,
                overlay: true
            });
            expect(asFragment()).toMatchSnapshot();
        });
    });

    describe('with darkmode', () => {
        it('renders', () => {
            const { container } = renderComponent({ darkMode: true });
            expect(container);
        });

        it('matches snapshot', () => {
            const { asFragment } = renderComponent({ darkMode: true });
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
