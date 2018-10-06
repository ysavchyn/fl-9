const PI = 3.141592;

const _sqrt = (s, x, last) => {
    return x != last ? _sqrt(s, (x + s / x) / 2.0, x) : x;
};

const sqrt = (s) => {
    return _sqrt(s, s / 2.0, 0.0);
};

const square = (x) => {
    return x * x;
};

export default {
    PI: PI,
    sqrt: sqrt,
    square: square
};