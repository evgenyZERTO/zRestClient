/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var Axios = require('axios');

exports.auth = (zvmip, zvmport, username, password) =>
{
    var instance = Axios.create({
                        baseURL: 'https://' + zvmip + ':' + zvmport,
                        headers: {
                                    'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
                                 }
                        });

    return instance.post('/v1/session/add', {AuthenticationMethod: 1})
    .then((successResult) => {
        var session = successResult.headers['x-zerto-session'];
        console.log('session from rest:' + session);
        return session;
    }, (error) => {
        console.log(error);
        return error;
    }).catch(function (error) {
        console.log(error);
    });
}

exports.logout =  (zvmip, zvmport, sessionid) => {
    Axios.delete('https://' + zvmip + '/' + zvmport + '/v1/session', 
                {headers: {'x-zerto-session': sessionid}})
    .then((successResult) => {
        console.log('Logged out - by deleting the session');
    }, (error) => {
        return error;
    });
};