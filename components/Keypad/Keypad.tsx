import classnames from 'classnames';
import { useCalculator } from '@hooks';
import Button from '@components/Button/Button';
import { keypadExtended, keypadDefault } from '@constants';

export interface ExtendedProps {
    portrait: boolean;
}

const Extended: React.FC<ExtendedProps> = ({ portrait }) => {
    const {
        state: { activeOperator },
        handleNumber,
        handleClear,
        handlePlusMinus,
        handlePercent,
        handleOperator,
        handleScientific,
        handleEquals
    } = useCalculator(portrait);

    const keypad = portrait ? keypadDefault : keypadExtended;

    return (
        <div
            className={classnames('grid', {
                'grid-cols-4 gap-2 mb-6 px-1 text-2xl': portrait,
                'grid-cols-10 gap-1 px-4': !portrait
            })}
            data-testid='keypad'
        >
            {keypad.map(({ variant, value, span, label, accessibleLabel }) => (
                <Button
                    key={label}
                    variant={variant}
                    value={value}
                    span={span}
                    label={label}
                    accessibleLabel={accessibleLabel || label}
                    onClick={() => {
                        if (variant === 'operator' && value !== '=')
                            handleOperator(value);
                        if (variant === 'number') handleNumber(label);
                        /* istanbul ignore next */
                        if (variant === 'scientific') handleScientific();
                        if (value === '=') handleEquals();
                        if (value === 'clear') handleClear();
                        if (value === 'plusMinus') handlePlusMinus();
                        if (value === 'percent') handlePercent();
                    }}
                    active={activeOperator === value}
                    portrait={portrait}
                />
            ))}
        </div>
    );
};

export default Extended;
