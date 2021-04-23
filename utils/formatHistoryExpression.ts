import { operatorRegex } from '@constants';

export const formatHistoryExpression = (exp: string): string =>
    `${exp.replace(operatorRegex, ' $& ')} =`;
