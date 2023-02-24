var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
/**
* @returns {dw.svc.Service} -
* */
var System = require('dw/system');
var hostName = System.Site.current.httpHostName;
function createToken() {
    var service = LocalServiceRegistry.createService('Create_token', {
        createRequest: function (svc) {
            var config = svc.getConfiguration();
            var credential = config.getCredential();
            var url = credential.getURL();
            svc = svc.setURL(url);
            svc = svc.setRequestMethod('POST');
            svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
            svc.addHeader('grant_type', 'client_credentials');
            svc.addHeader('Authorization', 'ZjZjNDJiNzAtZDI0Ny00ZmY4LWExYWItNjVjOTBjMTM3OWFjOmY2YzQyYjcwLWQyNDctNGZmOC1hMWFiLTY1YzkwYzEzNzlhYw==');
        },
        parseResponse: function (svc, response) {
            return response;
        },
        filterLogMessage: function (msg) {
            return msg;
        }
    });
    return service;
}
function getPreferenceGroup(BearerToken) {
    var service = LocalServiceRegistry.createService('Get_ocapi_data', {
        createRequest: function (svc) {
            var url = "https://"+hostName+"/s/-/dw/data/v22_8/system_object_definitions/SitePreferences/attribute_groups"
            svc = svc.setURL(url);
            svc = svc.setRequestMethod('GET');
            svc.addHeader('Content-Type', 'application/json');
            svc.addHeader('Accept', 'application/json');
            svc.addHeader('Authorization', BearerToken);
            svc.addHeader('x-dw-client-id', 'f6c42b70-d247-4ff8-a1ab-65c90c1379ac')
           
        },
        parseResponse: function (svc, response) {
            return response;
        },
        filterLogMessage: function (msg) {
            return msg;
        }
    });
    return service;

}
function getPreferenceId(groupId, BearerToken) {
    
    var service = LocalServiceRegistry.createService('Post_ocapi_data', {
        createRequest: function (svc, params) {
            var url = "https://"+hostName+"/s/-/dw/data/v22_8/site_preferences/preference_groups/" + groupId + "/development/preference_search"
            // setting url 
            svc = svc.setURL(url);
            svc = svc.setRequestMethod('POST');
            svc.addHeader('Content-Type', 'application/json');
            svc.addHeader('Accept', 'application/json');
            svc.addHeader('Authorization', BearerToken);
            return JSON.stringify(params);
        },
        parseResponse: function (svc, response) {
            return response;
        },
        filterLogMessage: function (msg) {
            return msg;
        }
    });
    return service;
}
function getPreferenceName(groupId,preferenceId,BearerToken) {
    var service = LocalServiceRegistry.createService('Get_Name', {
        createRequest: function (svc) {
            var url = "https://"+hostName+"/s/-/dw/data/v22_8/site_preferences/preference_groups/"+groupId+"/development/preferences/"+preferenceId;
            svc = svc.setURL(url);
            svc = svc.setRequestMethod('GET');
            svc.addHeader('Content-Type', 'application/json');
            svc.addHeader('Accept', 'application/json');
            svc.addHeader('Authorization', BearerToken);
            svc.addHeader('x-dw-client-id', 'f6c42b70-d247-4ff8-a1ab-65c90c1379ac')
           
        },
        parseResponse: function (svc, response) {
            return response;
        },
        filterLogMessage: function (msg) {
            return msg;
        }
    });
    return service;

}


module.exports = {
    createToken: createToken,
    getPreferenceGroup: getPreferenceGroup,
    getPreferenceId: getPreferenceId,
    getPreferenceName :getPreferenceName

};

