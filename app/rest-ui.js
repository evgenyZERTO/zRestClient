/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
var zRestClient = require('./zerto-rest-client.js');
var axios = require('axios');
var ipToSession = {};

exports.authenticate = (authenticationParams) => {
    let res = {};

    let apFuncs = authenticationParams.map(ap => auth(ap.ip, ap.port, ap.username, ap.password));

    return axios.all(apFuncs)
        .then((results) => {
            let i;
            for (i = 0; i < results.length; i++)
            {
                res[authenticationParams[i].ip] = results[i];
            }
        })
}

auth = (ip, port, username, password) => {
    return zRestClient.auth(ip, port, username, password)
                        .then(function(session) {
                            ipToSession[ip] = session;
                            return true;
                        })
                        .catch(function (error) {
                            return false;
                        });
}