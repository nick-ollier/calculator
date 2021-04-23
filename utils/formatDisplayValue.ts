export const formatDisplayValue = (val) => {
    if (val.toString().length > 9) return Number(val).toExponential(1);
    return val;
};
