function getMin() {
    let minValue = arguments[0];
    for (let i in arguments) {
        if (arguments[i] < minValue) {
            minValue = arguments[i];
        }
    }
    return minValue;
}