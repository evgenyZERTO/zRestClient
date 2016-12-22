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
    });
}

exports.logout =  (zvmip, zvmport, sessionid) => 
{
    var instance = Axios.create({
                        baseURL: 'https://' + zvmip + ':' + zvmport,
                        headers: {'x-zerto-session': sessionid}}
                        );

    return instance.delete('/v1/session', {AuthenticationMethod: 1})
    .then((successResult) => {
        console.log('Logged out - by deleting the session');
    }, (error) => {
        console.log(error);
        return error;
    });
};

exports.getAllVpgs = (zvmip, zvmport, sessionid) =>
{
    var instance = Axios.create({
                        baseURL: 'https://' + zvmip + ':' + zvmport,
                        headers: {'x-zerto-session': sessionid}}
                        );

    return instance.get('/v1/vpgs', {AuthenticationMethod: 1})
    .then((successResult) => {
        console.log(JSON.stringify(successResult.data));
        return successResult.data;
    }, (error) => {
        console.log(error);
        return error;
    });
}

exports.getAllCheckpoints = (zvmip, zvmport, sessionid, vpgId) =>
{
    var instance = Axios.create({
                        baseURL: 'https://' + zvmip + ':' + zvmport,
                        headers: {'x-zerto-session': sessionid}}
                        );

    return instance.get('vpgs/' + vpgId + '/checkpoints')
    .then((successResult) => {
        return successResult.data;
    }, (error) => {
        console.log(error);
        return error;
    });
}

exports.failovertest = (zvmip, zvmport, sessionid, vpgId, cpId) =>
{
    var instance = Axios.create({
                        baseURL: 'https://' + zvmip + ':' + zvmport,
                        headers: {'x-zerto-session': sessionid}}
                        );

    return instance.get('vpgs/' + vpgId + '/failovertest',
                        {AuthenticationMethod: 1,
                         CheckpointId: cpId})
    .then((successResult) => {
        return successResult.data;
    }, (error) => {
        console.log(error);
        return error;
    });

    
}

exports.installVra = (zvmip, zvmport, sessionid) =>
{
    var instance = Axios.create({
                        baseURL: 'https://' + zvmip + ':' + zvmport,
                        headers: {'x-zerto-session': sessionid}}
                        );

    return instance.post('v1/vras',{AuthenticationMethod: 1})
    .then((successResult) => {
        return successResult.data;
    }, (error) => {
        console.log(error);
        return error;
    });

    
}

exports.upgradeVra = (zvmip, zvmport, vraId, sessionid) =>
{
    var instance = Axios.create({
                        baseURL: 'https://' + zvmip + ':' + zvmport,
                        headers: {'x-zerto-session': sessionid}}
                        );

    return instance.post('v1/vras/' + vraId + '/upgrade' ,{AuthenticationMethod: 1})
    .then((successResult) => {
        return successResult.data;
    }, (error) => {
        console.log(error);
        return error;
    });

    
}

exports.getAllVras = (zvmip, zvmport, sessionid) =>
{
    var instance = Axios.create({
                        baseURL: 'https://' + zvmip + ':' + zvmport,
                        headers: {'x-zerto-session': sessionid}}
                        );

    return instance.get('/v1/vras', {AuthenticationMethod: 1})
    .then((successResult) => {
        console.log(JSON.stringify(successResult.data));
        return successResult.data;
    }, (error) => {
        console.log(error);
        return error;
    });
}
    