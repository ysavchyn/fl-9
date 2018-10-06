let inputs = process.argv.slice(2);
let result = inputs.map((e) => e[0].toUpperCase())
    .reduce((a, c) => a + c);

console.log(result);