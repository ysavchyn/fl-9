import CalculatingModule from './calculating-module';
const calculator = {
    displayVal: '0',
    first: null,
    waitingForSecond: false,
    operator: null
};

const inputDigit = digit => {
    const {
        displayVal,
        waitingForSecond
    } = calculator;

    if (waitingForSecond === true) {
        calculator.displayVal = digit;
        calculator.waitingForSecond = false;
    } else {
        if (displayVal === '0') {
            calculator.displayVal = digit;
            if (digit === '00') {
                calculator.displayVal = '0';
            }
        } else {
            calculator.displayVal = displayVal + digit;
        }
    }
}

const inputDot = dot => {
    if (calculator.waitingForSecond === true) {
        return;
    }
    if (!calculator.displayVal.includes(dot)) {
        calculator.displayVal += dot;
    }
}

const handler = nextOperator => {
    const {
        first,
        displayVal,
        operator
    } = calculator
    const inputValue = parseFloat(displayVal);

    if (operator && calculator.waitingForSecond) {
        calculator.operator = nextOperator;
        return;
    }

    if (first === null) {
        calculator.first = inputValue;
    } else if (operator) {
        const currentValue = first || 0;
        const result = CalculatingModule.performCalculation[operator](currentValue, inputValue);
        if (!Number.isFinite(Number(result))) {
            console.log('Divide by zero error.');
        }
        calculator.displayVal = String(result);
        calculator.first = result;
    }

    calculator.waitingForSecond = true;
    calculator.operator = nextOperator;
}

const resetCalculator = () => {
    calculator.displayVal = '0';
    calculator.first = null;
    calculator.waitingForSecond = false;
    calculator.operator = null;
}

const clearLastDigit = () => {
    if (calculator.displayVal.length !== 0) {
        calculator.displayVal = calculator.displayVal.toString().slice(0, -1);
    }
    if (calculator.displayVal.length === 0 && calculator.first === null) {
        resetCalculator();
        return;
    }
    if (calculator.displayVal.length === 0 && calculator.first !== null) {
        calculator.displayVal = calculator.first;
        calculator.waitingForSecond = false;
        calculator.operator = null;
        return;
    }
}

const calculatePercent = () => {
    calculator.displayVal = (calculator.displayVal / 100).toString();
}

export default {
    calculator: calculator,
    inputDigit: inputDigit,
    inputDot: inputDot,
    handler: handler,
    resetCalculator: resetCalculator,
    clearLastDigit: clearLastDigit,
    calculatePercent: calculatePercent
};