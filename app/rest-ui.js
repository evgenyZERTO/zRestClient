/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
var restServer = require('rest-server');

exports.authenticate = (ip, port, username, password) => {
    return restServer.authenticate(ip, port, username, password);
}

exports.authenticate = (authenticationParams) => {
    var tokensArray = [];

    authenticationParams.forEach(function(ap)
    {
        console.log(JSON.stringify(ap));

        authenticate(ap.ip, ap.port, ap.username, ap.password);
    });
}