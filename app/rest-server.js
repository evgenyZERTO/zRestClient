/**
 * Created by evgeny.rivkin on 21/12/2016.
 */

exports.auth =  (zvmip, zvmport, username, password) => {
    Axios.post('https://' + zvmip + '/' + zvmport + '/v1/session/add', 
                {headers: {
                            'Authorization': 'Basic ' + btoa(username + ':' + password)
                        },
                data: {AuthenticationMethod: 1}
                })
    .then((successResult) => {
        var session = headers('x-zerto-session');
        zertoApi.addHeaders({'x-zerto-session': session});
        console.debug('session identifier from login:' + globalStateModel.getSessionId());
        console.debug('session from rest:' + session);
    }, (error) => {
        return error;
    });
};

exports.logout =  (zvmip, zvmport, sessionid) => {
    Axios.delete('https://' + zvmip + '/' + zvmport + '/v1/session', 
                {headers: {'x-zerto-session': sessionid}})
    .then((successResult) => {
        console.debug('Logged out - by deleting the session');
    }, (error) => {
        return error;
    });
};