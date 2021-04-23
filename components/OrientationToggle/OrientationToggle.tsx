/* istanbul-ignore-file */
/* ^ Decorative */
import styled from 'styled-components';

const InnerToggle = styled.span<{ portrait: boolean }>`
    width: 50px;
    height: 50px;
    display: block;
    transform: ${({ portrait }) =>
        portrait ? 'rotate(0deg)' : 'rotate(-90deg)'};
`;

interface OrientationToggleProps {
    portrait: boolean;
    onClick: () => void;
}

const OrientationToggle: React.FC<OrientationToggleProps> = ({
    portrait,
    onClick
}) => (
    <button type='button' aria-label='Orientation Toggle' onClick={onClick}>
        <InnerToggle portrait={portrait}>
            <svg
                height='50'
                width='50'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 100 100'
            >
                <path d='M45.34,81a5.51,5.51,0,0,0,5.5-5.5V20.75a5.51,5.51,0,0,0-5.5-5.5H14.63a5.51,5.51,0,0,0-5.5,5.5V75.5a5.51,5.51,0,0,0,5.5,5.5ZM12.13,20.75a2.5,2.5,0,0,1,2.5-2.5H45.34a2.5,2.5,0,0,1,2.5,2.5v6.5H12.13Zm0,9.5H47.84v36H12.13Zm0,45.25V69.25H47.84V75.5a2.5,2.5,0,0,1-2.5,2.5H14.63A2.5,2.5,0,0,1,12.13,75.5Z' />
                <circle cx='29.99' cy='22.75' r='1.5' />
                <path d='M26.14,74.84h7.69a1.5,1.5,0,0,0,0-3H26.14a1.5,1.5,0,1,0,0,3Z' />
                <path d='M27,86.5a1.5,1.5,0,0,0,1.5,1.5H85.24a5.51,5.51,0,0,0,5.5-5.5V51.79a5.51,5.51,0,0,0-5.5-5.5H58.49a1.5,1.5,0,0,0,0,3H75.74V85H28.49A1.5,1.5,0,0,0,27,86.5ZM78.74,49.29h6.5a2.5,2.5,0,0,1,2.5,2.5V82.5a2.5,2.5,0,0,1-2.5,2.5h-6.5Z' />
                <circle cx='83.24' cy='67.14' r='1.5' />
                <path d='M60.93,12.31a1.5,1.5,0,0,0-2.12,0l-3.37,3.38a1.5,1.5,0,0,0,0,2.12l3.38,3.38a1.5,1.5,0,0,0,2.12-2.12l-.74-.74a16.13,16.13,0,0,1,14.64,15.4L74,32.94a1.5,1.5,0,0,0-2.12,2.12l3.38,3.38a1.5,1.5,0,0,0,2.12,0l3.38-3.37a1.5,1.5,0,0,0-2.12-2.12l-.84.84A19.12,19.12,0,0,0,60.05,15.32l.88-.88A1.5,1.5,0,0,0,60.93,12.31Z' />
            </svg>
        </InnerToggle>
    </button>
);

export default OrientationToggle;
