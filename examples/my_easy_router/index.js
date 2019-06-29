var express = require('express');
var app = express();

app.use('/', require('./routes/index'));

if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}
