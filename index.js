/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});