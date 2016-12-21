/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
var zRestClient = require('./zerto-rest-client.js');
var uuid = require('node-uuid');
var axios = require('axios');
var uuidToSite = {};

exports.authenticate = (authenticationParams) => {
    let res = {};

    let apFuncs = authenticationParams.map(ap => auth(ap.ip, ap.port, ap.username, ap.password));

    return axios.all(apFuncs)
        .then((sessions) => {
            let i;
            for (i = 0; i < sessions.length; i++)
            {
                if (sessions[i] != null) {
                    let assignUuid = uuid.v4();
                    let site = {
                        Ip: authenticationParams[i].ip,
                        Port: authenticationParams[i].port,
                        Session: sessions[i]
                    };
                    res[authenticationParams[i].ip] = assignUuid;
                    uuidToSite[assignUuid] = site;                    
                }
                else {
                    res[authenticationParams[i].ip] = null;
                }                    
            }
            return res;
        })
}

auth = (ip, port, username, password) => {
    return zRestClient.auth(ip, port, username, password)
                        .then(function(session) {
                            return session;
                        })
                        .catch(function (error) {
                            return null;
                        });
}

exports.getAllVpgs = (siteIds) => {
    if (siteIds instanceof Array) 
    {
        let siFuncs = siteIds.map(si => {
            if (si in uuidToSite) {
                return getSiteVpgs(uuidToSite[si].Ip, uuidToSite[si].Port, uuidToSite[si].Session);
            }
        });
        
        return axios.all(siFuncs)
            .then((results) => {
                return results;
            })
    }
    else
    {
        return getSiteVpgs(uuidToSite[siteIds].Ip, uuidToSite[siteIds].Port, uuidToSite[siteIds].Session)
            .then((result) => { 
                return result;
            });
    }
}

getSiteVpgs = (ip, port, session) => {
    return zRestClient.getAllVpgs(ip, port, session)
        .then((vpgs) => {
            return vpgs;
        })
        .catch(error => {
            return null;
        });
}