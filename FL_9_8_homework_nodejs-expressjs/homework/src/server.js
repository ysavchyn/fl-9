const express = require('express'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

require('./middlewares/delete-authorization')(app);
require('./routes')(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
})