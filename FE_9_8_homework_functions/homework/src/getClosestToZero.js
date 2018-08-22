function getClosestToZero() {
    let temp = Math.abs(arguments[0]),
        position = 0;
    for (let i in arguments) {
        if (Math.abs(arguments[i]) < temp) {
            temp = Math.abs(arguments[i]);
            position = i;
        }
    }
    return arguments[position];
}