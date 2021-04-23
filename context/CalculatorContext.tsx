import { createContext, useReducer } from 'react';
import { evaluate } from 'mathjs';
import { v4 as uuid } from 'uuid';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { getLastAction, handlePercent, togglePlusMinus } from '@utils';
import { CalculatorState } from '@appTypes';

const CalculatorContext = createContext(undefined);

const initialState: CalculatorState = {
    /**
     * displayValue:
     * The value that is shown on the calculator display
     */
    displayValue: '0',
    /**
     * activeOperator:
     * Is there an operator active (eg: + - / *)
     */
    activeOperator: null,
    /**
     * hasDecimalPoint:
     * Is the current displayValue a decimal number
     */
    hasDecimalPoint: false,
    /**
     * expression:
     * The running mathematical expression (eg: 1+2*3/4)
     */
    expression: '0',
    /**
     * lastAction:
     * The last completed action (eg: number + operator)
     */
    lastAction: '',
    /**
     * hasChanged:
     * Has there been a user input?
     */
    hasChanged: false
};

const CalculatorProvider: React.FC = ({ children }) => {
    const [history, setHistory] = useLocalStorage('history', []);

    const reducer = (state: CalculatorState, action) => {
        switch (action.type) {
            case 'NUMBER': {
                const {
                    displayValue,
                    expression,
                    activeOperator,
                    hasDecimalPoint,
                    hasChanged
                } = state;

                // Early return - Number is too large
                if (
                    displayValue.length >= action.payload.maxLength &&
                    !activeOperator
                ) {
                    return state;
                }

                // Early return - No extra leading zeros
                if (action.payload.number === '0' && displayValue === '0') {
                    return state;
                }

                // Early return - No extra decimal places
                if (action.payload.number === '.' && hasDecimalPoint) {
                    return state;
                }

                let updatedDisplayValue = `${displayValue}${action.payload.number}`;
                let updatedExpression = `${expression}${activeOperator ?? ''}${
                    action.payload.number
                }`;

                // If there's an activeOperator - Update the displayValue to only show payload
                if (activeOperator) {
                    updatedDisplayValue = action.payload.number;
                }

                // If display value has a leading zero but is not a decimal - return values without leading 0
                if (
                    updatedDisplayValue.charAt(0) === '0' &&
                    updatedDisplayValue.charAt(1) !== '0'
                ) {
                    updatedDisplayValue = updatedDisplayValue.substr(1);
                    updatedExpression = updatedExpression.substr(1);
                }

                // If the calculator is in its default state and, and the current updated value isn't "0."
                if (!hasChanged && updatedDisplayValue !== '0.') {
                    updatedDisplayValue = action.payload.number;
                    updatedExpression = String(action.payload.number);
                }

                return {
                    ...state,
                    displayValue: updatedDisplayValue,
                    expression: updatedExpression,
                    hasDecimalPoint:
                        hasDecimalPoint || action.payload.number === '.',
                    activeOperator: null,
                    hasChanged: true
                };
            }

            case 'OPERATOR': {
                const { expression } = state;

                return {
                    ...state,
                    hasDecimalPoint: false,
                    activeOperator: action.payload,
                    displayValue: String(evaluate(expression) || '0'),
                    expression,
                    hasChanged: true
                };
            }

            case 'PLUS_MINUS': {
                const { displayValue, expression, activeOperator } = state;

                // If value is 0 -OR- there's an active operator
                if (displayValue === '0' || activeOperator) return state;

                return {
                    ...state,
                    displayValue: togglePlusMinus(displayValue),
                    expression: togglePlusMinus(expression),
                    hasChanged: true
                };
            }

            case 'PERCENT': {
                const { displayValue, expression, activeOperator } = state;

                // If value is 0 -OR- there's an active operator
                if (displayValue === '0' || activeOperator) return state;

                return {
                    ...state,
                    hasDecimalPoint: false,
                    displayValue: handlePercent(expression).displayValue,
                    expression: handlePercent(expression).expression,
                    hasChanged: true
                };
            }

            case 'BACKSPACE': {
                const { displayValue, expression, activeOperator } = state;

                // If value is 0 -OR- there's an active operator
                if (displayValue === '0' || activeOperator) return state;

                return {
                    ...state,
                    displayValue: displayValue.slice(0, -1) || '0',
                    expression: expression.slice(0, -1) || '0',
                    hasDecimalPoint: displayValue.slice(0, -1).includes('.'),
                    hasChanged: true
                };
            }

            case 'EQUALS': {
                // Early return - If there's no expression
                if (state.expression === '0' && !state.hasChanged) return state;

                const formattedExpression =
                    state.lastAction === getLastAction(state.expression)
                        ? `${state.expression}${state.lastAction}`
                        : state.expression;

                setHistory([
                    ...history,
                    {
                        id: uuid(),
                        expression: formattedExpression,
                        value: evaluate(formattedExpression)
                    }
                ]);

                return {
                    ...state,
                    displayValue: evaluate(formattedExpression).toString(),
                    expression: formattedExpression,
                    lastAction: getLastAction(state.expression),
                    activeOperator: null,
                    hasChanged: false
                };
            }

            case 'CLEAR': {
                return { ...initialState };
            }

            case 'SCIENTIFIC': {
                return { ...state };
            }

            default: {
                throw new Error(
                    `UNHANDLED TYPE: ${action.type} - Oops! You probably didn't mean to do that!`
                );
            }
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CalculatorContext.Provider
            value={{ state, dispatch, history, setHistory }}
        >
            {children}
        </CalculatorContext.Provider>
    );
};

export default CalculatorProvider;
export { CalculatorContext, initialState };
