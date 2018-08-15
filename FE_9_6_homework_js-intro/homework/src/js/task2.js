function isInteger(num) {
    if (parseFloat(Math.trunc(num)).toFixed(2) === num.toFixed(2)) {
        return parseInt(num, 10);
    } else {
        return num.toFixed(2);
    }
}

let a = parseFloat(window.prompt('a length:')),
    b = parseFloat(window.prompt('b length:')),
    y = parseFloat(window.prompt('y angle in between:')),
    magic = 180,
    c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(y * (Math.PI / magic))),
    p = (a + b + c) / 2,
    square = isInteger(Math.sqrt(p * (p - a) * (p - b) * (p - c)));

if (isInteger(a) <= 0 || isInteger(b) <= 0 || square === 0.00) {
    console.log('Invalid data');
} else {
    console.log('c length: ' +
        isInteger(c) +
        '\nTriangle square: ' +
        square +
        '\nTriangle perimeter: ' +
        isInteger(p * 2));
}