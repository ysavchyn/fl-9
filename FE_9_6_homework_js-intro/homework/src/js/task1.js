function isInteger(num) {
    if (parseFloat(Math.trunc(num)).toFixed(2) === num.toFixed(2)) {
        return parseInt(num, 10);
    } else {
        return num.toFixed(2);
    }
}

let amount = parseFloat(window.prompt('Please, enter amount of money:')),
    discount = parseFloat(window.prompt('Please, enter discount:'));

if (amount < 0 || discount < 0) {
    console.log('Invalid data');
} else {
    console.log('Price without discount: ' +
        isInteger(amount) +
        '\nDiscount: ' +
        isInteger(discount) +
        '%\nPrice with discount: ' +
        isInteger(amount * (1 - discount / 100)) +
        '\nSaved: ' +
        isInteger(amount - amount * (1 - discount / 100)));
}