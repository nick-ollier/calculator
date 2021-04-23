import { useState } from 'react';
import classnames from 'classnames';
import DOMPurify from 'isomorphic-dompurify';

const c = {
    number: 'bg-gray-400 text-gray-100',
    numberActive: 'bg-gray-500',
    defaults: 'bg-gray-200 text-gray-500',
    defaultsActive: 'bg-gray-300',
    operator: 'bg-orange-200 text-gray-100 dark:bg-orange-100',
    operatorActive: 'bg-white text-orange-200 dark:text-orange-100',
    scientific: 'bg-gray-500 text-gray-100',
    scientificActive: 'bg-gray-600',
    portrait: 'min-w-btn-p min-h-btn-p',
    landscape: 'min-h-btn-l min-w-btn-l',
    span: 'text-left px-6'
};

export interface ButtonProps {
    span?: number;
    variant?: 'default' | 'number' | 'operator' | 'scientific';
    active: boolean;
    label: string;
    accessibleLabel: string;
    value: string;
    portrait: boolean;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
    span = 1,
    variant = 'default',
    active,
    label,
    accessibleLabel,
    value,
    portrait,
    onClick
}) => {
    const [displayClick, setDisplayClick] = useState(false);

    const handleClick = () => {
        setDisplayClick(true);
        onClick();

        setTimeout(() => {
            setDisplayClick(false);
        }, 300);
    };

    return (
        <button
            type='button'
            value={value}
            aria-label={accessibleLabel}
            onClick={handleClick}
            className={classnames('rounded-full', `col-span-${span}`, {
                [c.number]: variant === 'number',
                [c.numberActive]: variant === 'number' && displayClick,
                [c.defaults]: variant === 'default',
                [c.defaultsActive]: variant === 'default' && displayClick,
                [c.operator]: variant === 'operator' && !active,
                [c.operatorActive]: variant === 'operator' && active,
                [c.scientific]: variant === 'scientific',
                [c.scientificActive]: variant === 'scientific' && displayClick,
                [c.span]: span > 1,
                [c.portrait]: portrait,
                [c.landscape]: !portrait
            })}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(label)
            }}
        />
    );
};

export default Button;
