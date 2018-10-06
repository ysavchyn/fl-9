let fs = require('fs');

function run(generator) {
    let it = generator(go);

    function go(err, result) {
        if (err) {
            return it.throw(err);
        }
        it.next(result);
    }

    go();
}

run(function* (done) {
    let firstFile;
    try {
        let dirFiles = yield fs.readdir('NoNoNoNo', done);
        firstFile = dirFiles[0];
    } catch (e) {
        firstFile = null;
    }
    
    console.log(firstFile);
});