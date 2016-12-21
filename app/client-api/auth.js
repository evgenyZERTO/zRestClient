/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
exports.auth =  (username, password) => {
    var deferred = $q.defer();

    var authenticationRequest = {
        method: 'POST',
        url: 'v1/session/add',
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        },
        data: {AuthenticationMethod: 1}
    };

    $http(authenticationRequest).success(function (data, status, headers/*, config*/) {
        var session = headers('x-zerto-session');
        zertoApi.addHeaders({'x-zerto-session': session});

        console.debug('session identifier from login:' + globalStateModel.getSessionId());
        console.debug('session from rest:' + session);
        deferred.resolve(data);

    }).error(function (error) {
        deferred.reject(error);
        console.error('failed to authenticate to rest API');
    });

    return deferred.promise;
};