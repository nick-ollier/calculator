export interface CalculatorState {
    displayValue: string;
    activeOperator: boolean;
    hasDecimalPoint: boolean;
    expression: string;
    lastAction: string;
    hasChanged: boolean;
}
