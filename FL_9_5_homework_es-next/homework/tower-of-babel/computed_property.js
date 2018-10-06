let obj = {
    [Number(process.argv[2]) % 2 === 0 ? 'even' : 'odd']: Number(process.argv[2]),
    [Number(process.argv[3]) + Number(process.argv[2])]: Number(process.argv[3]) + Number(process.argv[2])
};

console.log(obj);