const calculatorTemplate = `<div class="calculator">
            <input type="text" class="calculatorDisplay" value="" disabled />
            <div class="calculatorKeyboard">
                <button type="button" class="clearAll">AC</button>
                <button type="button" class="clear">C</button>
                <button type="button" class="percent">%</button>
                <button type="button" class="operator" value="/">&divide;</button>
                <button type="button" value="7">7</button>
                <button type="button" value="8">8</button>
                <button type="button" value="9">9</button>
                <button type="button" class="operator" value="*">&times;</button>
                <button type="button" value="4">4</button>
                <button type="button" value="5">5</button>
                <button type="button" value="6">6</button>
                <button type="button" class="operator" value="-">-</button>
                <button type="button" value="1">1</button>
                <button type="button" value="2">2</button>
                <button type="button" value="3">3</button>
                <button type="button" class="operator" value="+">+</button>
                <button type="button" value="0">0</button>
                <button type="button" value="00">00</button>
                <button type="button" class="decimal" value=".">.</button>
                <button type="button" class="operator" value="=">=</button>
            </div>
        </div>`;

const root = document.querySelector('#root');
root.innerHTML = calculatorTemplate;

import InterfaceModule from './interface-module';

const updateDisplay = () => {
    const display = document.querySelector('.calculatorDisplay');
    display.value = InterfaceModule.calculator.displayVal;
}

updateDisplay();

const keys = document.querySelector('.calculatorKeyboard');
keys.addEventListener('click', (event) => {
    const {
        target
    } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        InterfaceModule.handler(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        InterfaceModule.inputDot(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('clearAll')) {
        InterfaceModule.resetCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('clear')) {
        InterfaceModule.clearLastDigit();
        updateDisplay();
        return;
    }

    if (target.classList.contains('percent')) {
        InterfaceModule.calculatePercent();
        updateDisplay();
        return;
    }

    InterfaceModule.inputDigit(target.value);
    updateDisplay();
});