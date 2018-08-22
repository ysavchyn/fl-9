function isPrime(value) {
    for (let i = 2; i <= Math.sqrt(value); i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return true;
}