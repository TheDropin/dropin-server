var request = require('supertest');

describe('loading express', function () {

    var server;
    var prefix = "/api/v1";
    
    beforeEach(function () {
        server = require('../server');
    });

    afterEach(function () {
        server.close();
    });

    it('responds to /', function(done) {
        request(server)
            .get(prefix+'/')
            .expect(200, done);
    });

    it('404 everything else', function(done) {
        request(server)
            .get(prefix+'/foo/bar')
            .expect(404, done);
    });
        
});
