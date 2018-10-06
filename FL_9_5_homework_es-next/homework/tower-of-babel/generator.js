const max = process.argv[2];

let FizzBuzz = function* () {
    let n = 1,
        value;
    
    while (n <= max) {
        value = n;
        if (value % 15 === 0) value = 'FizzBuzz'
        else if (value % 3 === 0) value = 'Fizz';
        else if (value % 5 === 0) value = 'Buzz';
        n++;
        
        yield value;
    }
}();

for (let n of FizzBuzz) {
    console.log(n);
}