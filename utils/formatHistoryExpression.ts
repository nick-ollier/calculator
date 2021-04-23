import { operatorRegex } from '@constants';

export const formatHistoryExpression = (exp) =>
    `${exp.replace(operatorRegex, ' $& ')} =`;
