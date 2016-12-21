/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
var zClient = require('./app/zerto-rest-client');

var express = require('express');
var app = express();
var router = express.Router();
var restUi = require('./app/rest-ui')

app.use(express.static('ui'));
app.use('/api', router);

router.route('/auth')
    .post(function(req, res) {
        restUi.authenticate(req.query.authParams).then((result) => {res.json(result)});
    })


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});