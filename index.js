/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
var zClient = require('./app/zerto-rest-client');
var axios = require('axios');
var express = require('express');
var app = express();
var router = express.Router();
var restUi = require('./app/rest-ui')
var bodyParser = require('body-parser')

app.use(express.static('ui'));
app.use('/api', router);
router.use(bodyParser.json())

router.route('/auth')
    .post(function(req, res) {
        restUi.authenticate(req.body).then((result) => {res.json(result)});
    });

router.route('/get_all_vpgs')
    .get(function(req, res) {
        restUi.getAllVpgs(req.query.sites).then((result) => {res.json(result)});
    });

router.route('/install_vras')
    .post(function(req, res) {
        restUi.installVras(req.body).then((result) => {res.json(result)});
    });

router.route('/upgrade_vras')
    .post(function(req, res) {
        restUi.upgradeVras(req.body).then((result) => {res.json(result)});
    });

router.route('/get_all_vras')
    .get(function(req, res) {
        restUi.getAllVras(req.query.sites).then((result) => {res.json(result)});
    });

/*
app.get('/api/test', (req, res) => {
    zClient.auth('172.20.133.234', '9669', 'administrator', 'zertodata').then(function(session) 
    {
        zClient.getAllVpgs('172.20.133.234', '9669', session).then(function(res) 
        {
            var vpg = res[0];
            console.log("Work on Vpg: " + vpg.VpgName + ".");
            zClient.getAllCheckpoints('172.20.133.234', '9669', session, vpg.VpgIdentifier).then(function(res) 
            {
                var cp = res[0];
                //zClient.failovertest('127.0.0.1', '9669', cp.CheckpointIdentifier).then(function(res) 
                //{
                  //  console.log("SUCCESS");
                //})
            })
        })
    })
    ;
    
});*/

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});