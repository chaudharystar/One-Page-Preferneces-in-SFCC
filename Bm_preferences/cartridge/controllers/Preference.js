'use strict';

var server = require('server');

server.get('Show',
    server.middleware.https,
    function (req, res, next) {
        var System = require('dw/system');
        var Site = System.Site.getCurrent();
        var value = dw.system.Site.getCurrent().getPreferences();
        var Logger = require('dw/system/Logger');
        var sampleService = require('*/cartridge/scripts/svc/service.js');
        var groupId = [];
        var token = sampleService.createToken();

        var tokenResponce = token.call();
        if (tokenResponce.ok) {
            var tokenData = JSON.parse(tokenResponce.object.text);
            var BearerToken = tokenData.token_type + ' ' + tokenData.access_token;
            var svc = sampleService.getPreferenceGroup(BearerToken);
            var svcResponse = svc.call();
            if (svcResponse.ok) {
                var bodyData = JSON.parse(svcResponse.object.text);
                for (let i = 0; i < bodyData.count; i++) {
                    var grpOrigianal = bodyData.data[i].id;
                    var grp = bodyData.data[i].id;
                    if (grp.replace(/\s/g, "")) {
                        grp = grp.replace(/\s/g, "%20");
                    }
                    var svcResult = sampleService.getPreferenceId(grp, BearerToken)
                    var payload = {
                        "query": {
                            "match_all_query": {}
                        }
                    };
                    var svcResponse = svcResult.call(payload);
                    if (svcResponse.ok) {
                        var a = [];
                        var pId = JSON.parse(svcResponse.object.text);
                        for (let j = 0; j < pId.count; j++) {
                            var obj = {};
                            var PreferenceName = sampleService.getPreferenceName(grp, pId.hits[j].id, BearerToken);
                            var pNameData = PreferenceName.call();
                            if (pNameData.ok) {
                                var name = JSON.parse(pNameData.object.text);
                                obj.preferenceId = pId.hits[j].id;
                                obj.gId = grpOrigianal;
                                obj.preferenceName = name.display_name.default;

                            }
                            groupId.push(obj);
                        }
                    }
                }

            }
            var a = 1;
        }
        res.render('preference/support/form', {
            groupId: groupId,
            value: value
        });
        next();

    });

module.exports = server.exports();
