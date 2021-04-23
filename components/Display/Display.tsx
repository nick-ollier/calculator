import classnames from 'classnames';

export interface DisplayProps {
    locale?: string;
    displayValue?: number;
    portrait: boolean;
}

const Display: React.FC<DisplayProps> = ({
    locale = 'en-AU',
    displayValue = 0,
    portrait
}) => {
    let value = Intl.NumberFormat(locale, {
        maximumFractionDigits: 10
    }).format(displayValue);

    if (portrait && String(displayValue).length >= 10) {
        value = parseFloat(value).toExponential(1);
    }

    return (
        <div
            className={classnames('w-full text-right text-4xl px-5', {
                'text-6xl': value.length <= 7 && portrait,
                'text-5xl': value.length > 7 && portrait,
                'px-8': !portrait
            })}
            data-testid='display'
        >
            {value}
        </div>
    );
};

export default Display;
