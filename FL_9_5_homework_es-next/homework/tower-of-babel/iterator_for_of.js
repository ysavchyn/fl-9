const max = process.argv[2];
let FizzBuzz = {
      [Symbol.iterator]() {
        let n = 1;

        return {
            next() {
                let value = n;
                if (n < max) {
                    if (value % 15 === 0) value = 'FizzBuzz'
                    else if (value % 3 === 0) value = 'Fizz';
                    else if (value % 5 === 0) value = 'Buzz';
                    n++;
                    return {
                        done: false,
                        value: value
                    };
                }
                return {
                    done: true
                };
            }
        }
    }
}

for (let n of FizzBuzz) {
    console.log(n);
}