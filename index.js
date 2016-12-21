/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
var express = require('express');
var app = express();

app.use(express.static('ui'));

app.get('/api/test', (req, res) => {
    console.log(JSON.stringify(req.query));
    res.send(JSON.stringify(req.query));
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});