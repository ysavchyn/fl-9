function isSmaller(firstValue, secondValue) {
    function isBigger(firstValue, secondValue) {
        return firstValue > secondValue;
    }
    if (firstValue === secondValue) {
        return false;
    } else {
        return !isBigger(firstValue, secondValue);
    }
}