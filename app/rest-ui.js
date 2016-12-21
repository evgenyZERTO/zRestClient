/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
var restServer = require('./rest-server.js');

exports.authenticate = (authenticationParams) => {

    var res = {};

    authenticationParams.forEach(function(ap)
    {
        //console.log(JSON.stringify(ap));

        restServer.auth(ap.ip, ap.port, ap.username, ap.password);
    });
}