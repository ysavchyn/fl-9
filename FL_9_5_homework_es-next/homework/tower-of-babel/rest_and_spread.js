let rawArgs = process.argv.slice(2);
let args = [];

rawArgs.forEach(val => {
    let commaSep = val.split(',');
    commaSep.forEach(val => {
        if (val !== '') args.push(Number(val));
    });
});

let avg = (...args) => {
    return args.reduce((a, c) => a + c) / args.length;
};

console.log(avg(...args));