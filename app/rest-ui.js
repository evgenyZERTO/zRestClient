/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
var zRestClient = require('./zerto-rest-client.js');
var axios = require('axios');
var ipToSession = {};

exports.authenticate = (authenticationParams) => {

    var res = {};

    return axios.all(function(ap)
        {
            zRestClient.auth(ap.ip, ap.port, ap.username, ap.password)
                        .then(function(session) {
                            ipToSession[ap.ip] = session;
                            res[ap.ip] = true;
                        })
                        .catch(function (error) {
                            res[ap.ip] = false;
                        }); 
        })
        .then(() => {return res;})
}