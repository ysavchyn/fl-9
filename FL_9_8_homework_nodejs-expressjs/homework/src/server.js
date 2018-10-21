const express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser'),
    path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

require(path.resolve(__dirname + '/middlewares/delete-authorization'))(app);
require(path.resolve(__dirname + '/routes'))(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});