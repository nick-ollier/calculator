import { formatHistoryExpression } from '@utils';

export interface ItemProps {
    value: string;
    expression: string;
}
const Item: React.FC<ItemProps> = ({ value, expression }) => (
    <div
        role='presentation'
        aria-label={`${expression}=${value}`}
        className='mb-4 text-right cursor-pointer'
        onClick={() => navigator.clipboard.writeText(value)}
    >
        <p className='text-sm'>{formatHistoryExpression(expression)}</p>
        <p className='text-2xl font-bold'>{value}</p>
    </div>
);

export default Item;
