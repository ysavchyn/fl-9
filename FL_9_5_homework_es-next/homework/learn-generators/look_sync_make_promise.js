function getFoo() {
    return new Promise(function (resolve) {
        resolve('foo');
    });
}

function run(generator) {
    let it = generator();

    function go(result) {
        if (result.done) {
            return result.value;
        }

        return result.value.then(function (value) {
            return go(it.next(value));
        }, function (e) {
            return go(it.throw(e));
        });
    }

    go(it.next());
}

run(function* () {
    try {
        let foo = yield getFoo();
        console.log(foo);
    } catch (e) {
        console.log(e);
    }
});