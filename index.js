/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
var zClient = require('./app/zerto-rest-client');

var express = require('express');
var app = express();

app.use(express.static('ui'));

app.get('/api/test', (req, res) => {
    zClient.auth('127.0.0.1', '9669', 'administrator', 'zertodata').then(function(session) 
    {
        zClient.getAllVpgs('127.0.0.1', '9669', session).then(function(res) 
        {
            var vpg = res[0];
            console.log("Work on Vpg: " + vpg.VpgName + ".");
            zClient.getAllCheckpoints('127.0.0.1', '9669', session, vpg.VpgIdentifier).then(function(res) 
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
    
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});