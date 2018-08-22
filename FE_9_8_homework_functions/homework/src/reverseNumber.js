function reverseNumber(value) {
    if (value < 0) {
        return -reverseNumber(-value);
    } else {
        let valueString = value.toString(),
            valueArray = valueString.split(''),
            valueReverseArray = valueArray.reverse(),
            valueReverse = valueReverseArray.join('');
        return Number(valueReverse);
    }
}