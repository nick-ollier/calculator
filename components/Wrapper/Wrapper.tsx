import styled from 'styled-components';

const StyledWrapper = styled.div<{ portrait: boolean }>`
    height: ${({ portrait }) => (portrait ? '700px' : '350px')};
    position: relative;
    width: ${({ portrait }) => (portrait ? '350px' : '700px')};
`;

const Screen = styled.div<{ darkMode: boolean }>`
    background-color: ${({ darkMode }) => (darkMode ? 'black' : 'white')};
    border-radius: 30px;
    box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.75);
    width: 95%;
    height: 95%;
    top: 2.5%;
    left: 2.5%;
    position: absolute;
`;

const IPhone = styled.div<{ portrait: boolean }>`
    height: 100%;
    overflow: hidden;
    position: absolute;
    width: 100%;

    &::after {
        background-image: url('/iPhone.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        content: '';
        position: absolute;

        ${({ portrait }) =>
            portrait
                ? `
            height: 100%;
            width: 100%;
          `
                : `
          height: 200%;
          width: 200%;
          top: -50%;
          left: -50%;
          transform: rotate(-90deg);
    `}
    }
`;

const Content = styled.div<{ portrait: boolean }>`
    height: 100%;
    padding: ${({ portrait }) => (portrait ? '30px' : '20px 40px')};
    position: relative;
`;

const Overlay = styled.div<{ portrait: boolean }>`
    height: ${({ portrait }) => (portrait ? '94%' : '86%;')};
    width: ${({ portrait }) => (portrait ? '86%' : '94%;')};
    position: absolute;
    top: ${({ portrait }) => (portrait ? '3%' : '7%;')};
    left: ${({ portrait }) => (portrait ? '7%' : '3%;')};
    background: black;
    opacity: 0.75;
    border-radius: 35px;
`;

export interface WrapperProps {
    darkMode: boolean;
    portrait: boolean;
    overlay: boolean;
}

const Wrapper: React.FC<WrapperProps> = ({
    children,
    darkMode,
    portrait,
    overlay
}) => (
    <StyledWrapper portrait={portrait}>
        <Screen darkMode={darkMode} />
        <IPhone portrait={portrait} />
        <Content portrait={portrait}>{children}</Content>
        {overlay && <Overlay portrait={portrait} data-testid='overlay' />}
    </StyledWrapper>
);

export default Wrapper;
