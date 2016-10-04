require('jasmine-expect');
var util = require('../util');

describe('util', function () {

    it('can decode a geo-header', function () {

        var req = {
            headers: {
                "geo-position": "44,-93 spd=10"
            }
        };

        var decoded = util.getGeoHeader(req);
        
        expect(decoded.latitude).toBeNumber();
        
    });
        
});