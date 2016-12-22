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
    let siFuncs = [];    

    return axios.all(apFuncs)
        .then((sessions) => {
            let i;
            for (i = 0; i < sessions.length; i++)
            {
                if (sessions[i] != null) {                                    
                    siFuncs.push(zRestClient.getSiteInfo(authenticationParams[i].ip, authenticationParams[i].port, sessions[i]));                     
                }
                else {
                    res[authenticationParams[i].ip] = null;
                }                    
            }
            return axios.all(siFuncs).then((siteInfos) => {
                let i;
                for (i = 0; i < siteInfos.length; i++)
                {
                    let site = {                            
                        Ip : authenticationParams[i].ip,
                        Port : authenticationParams[i].port,
                        Session : sessions[i]                        
                    };
                    uuidToSite[siteInfos[i].Link.identifier] = site;
                    res[siteInfos[i].SiteName] = siteInfos[i].Link.identifier; 
                    return res;                                                                                                  
                }
            });    
        });
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
    if (Array.isArray(siteIds)) 
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
        if (uuidToSite[siteIds]) {
            return getSiteVpgs(uuidToSite[siteIds].Ip, uuidToSite[siteIds].Port, uuidToSite[siteIds].Session)
                .then((result) => { 
                    return result;
                });
        }
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

exports.installVras = (siteParams) => {
    let spFuncs = siteParams.map(sp => {
        if (sp.id in uuidToSite) {
            return installVra(uuidToSite[sp.id].Ip, uuidToSite[sp.id].Port, uuidToSite[sp.id].Session);
        }
    });
    
    return axios.all(spFuncs)
        .then((results) => {
            return results;
        })
}

installVra = (ip, port, session) => {
    return zRestClient.installVra(ip, port, session)
                        .then(function(vraId) {
                            return vraId;
                        })
                        .catch(function (error) {
                            return null;
                        });
}

exports.upgradeVras = (siteParams) => {
    let spFuncs = []

    siteParams.forEach(sp => {
        if (sp.id in uuidToSite) {
            sp.vraIds.forEach(function(vraId) {
                spFuncs.push(upgradeVra(uuidToSite[sp.id].Ip, uuidToSite[sp.id].Port, vraId, uuidToSite[sp.id].Session));
            })
        }
    });
    
    return axios.all(spFuncs)
        .then((results) => {
            return results;
        })
}

upgradeVra = (ip, port, vraId, session) => {
    return zRestClient.upgradeVra(ip, port, vraId, session)
                        .then(function(result) {
                            return result;
                        })
                        .catch(function (error) {
                            return null;
                        });
}

exports.getAllVras = (siteIds) => {
    if (Array.isArray(siteIds)) 
    {
        let siFuncs = siteIds.map(si => {
            if (si in uuidToSite) {
                return getSiteVra(uuidToSite[si].Ip, uuidToSite[si].Port, uuidToSite[si].Session);
            }
        });
        
        return axios.all(siFuncs)
            .then((results) => {
                return results;
            })
    }
    else
    {
        if (uuidToSite[siteIds]) {
            return getSiteVra(uuidToSite[siteIds].Ip, uuidToSite[siteIds].Port, uuidToSite[siteIds].Session)
                .then((result) => { 
                    return result;
                });
        }
    }
}

getSiteVra = (ip, port, session) => {
    return zRestClient.getAllVras(ip, port, session)
        .then((vpgs) => {
            return vpgs;
        })
        .catch(error => {
            return null;
        });
}

exports.getAllCheckpoints = (siteParams) => {
    if (Array.isArray(siteParams)) 
    {
        let spFuncs = siteParams.map(sp => {
            if (sp.id in uuidToSite) {
                return getSiteCheckpoint(uuidToSite[sp.id].Ip, uuidToSite[sp.id].Port, sp.vpgId, uuidToSite[sp.id].Session);
            }
        });
        
        return axios.all(spFuncs)
            .then((results) => {
                return results;
            })
    }
    else
    {
        if (uuidToSite[siteParams]) {
            return getSiteVpgs(uuidToSite[siteParams.id].Ip, uuidToSite[siteParams.id].Port, siteParams.vpgId, uuidToSite[siteParams.id].Session)
                .then((result) => { 
                    return result;
                });
        }
    }
}

getSiteCheckpoint = (ip, port, vpgId, session) => {
    return zRestClient.getAllCheckpoints(ip, port, session, vpgId)
        .then((vpgs) => {
            return vpgs;
        })
        .catch(error => {
            return null;
        });
}

exports.failoverTest = (siteParams) => {
    let spFuncs = []

    siteParams.forEach(sp => {
        if (sp.id in uuidToSite) {
            sp.vpgIds.forEach(function(vpgId) {
                sp.cpIds.forEach(function(cpId) {
                    spFuncs.push(failoverTest(uuidToSite[sp.id].Ip, uuidToSite[sp.id].Port, uuidToSite[sp.id].Session, vpgId. cpId));
                })
            })
        }
    });
    
    return axios.all(spFuncs)
        .then((results) => {
            return results;
        })
}

failoverTest = (ip, port, session, vpgId, cpId) => {
    return zRestClient.failovertest(ip, port, session, vpgId, cpId)
                        .then(function(result) {
                            return result;
                        })
                        .catch(function (error) {
                            return null;
                        });
}