/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_output_module_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_styles_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_styles_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_styles_css__);



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interface_module__ = __webpack_require__(2);
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



const updateDisplay = () => {
    const display = document.querySelector('.calculatorDisplay');
    display.value = __WEBPACK_IMPORTED_MODULE_0__interface_module__["a" /* default */].calculator.displayVal;
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
        __WEBPACK_IMPORTED_MODULE_0__interface_module__["a" /* default */].handler(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        __WEBPACK_IMPORTED_MODULE_0__interface_module__["a" /* default */].inputDot(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('clearAll')) {
        __WEBPACK_IMPORTED_MODULE_0__interface_module__["a" /* default */].resetCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('clear')) {
        __WEBPACK_IMPORTED_MODULE_0__interface_module__["a" /* default */].clearLastDigit();
        updateDisplay();
        return;
    }

    if (target.classList.contains('percent')) {
        __WEBPACK_IMPORTED_MODULE_0__interface_module__["a" /* default */].calculatePercent();
        updateDisplay();
        return;
    }

    __WEBPACK_IMPORTED_MODULE_0__interface_module__["a" /* default */].inputDigit(target.value);
    updateDisplay();
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calculating_module__ = __webpack_require__(3);

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
        const result = __WEBPACK_IMPORTED_MODULE_0__calculating_module__["a" /* default */].performCalculation[operator](currentValue, inputValue);
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

/* harmony default export */ __webpack_exports__["a"] = ({
    calculator: calculator,
    inputDigit: inputDigit,
    inputDot: inputDot,
    handler: handler,
    resetCalculator: resetCalculator,
    clearLastDigit: clearLastDigit,
    calculatePercent: calculatePercent
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const performCalculation = {
    '/': (first, second) => first / second,
    '*': (first, second) => first * second,
    '+': (first, second) => first + second,
    '-': (first, second) => first - second,
    '=': (first, second) => second
};

/* harmony default export */ __webpack_exports__["a"] = ({
    performCalculation: performCalculation
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);