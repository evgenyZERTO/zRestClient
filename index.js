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

/*
app.get('/api/test', (req, res) => {
    console.log(JSON.stringify(req.query));
    res.send(JSON.stringify(req.query));
    
    zClient.auth('127.0.0.1', '9669', 'administrator', 'zertodata').then(function(session) {console.log('YAYYY'+session);})
    
});
*/
router.route('/auth')
    .post(function(req, res) {
        restUi.authenticate(req.query.authParams)
        console.log("end");
    })



app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});