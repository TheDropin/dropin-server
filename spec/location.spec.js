var request = require('supertest');

describe('locations', function () {

    var server;
    
    beforeEach(function () {
        server = require('../server');
    });

    afterEach(function () {
        server.close();
    });

    it('post a location', function(done) {
        
        var loc = {};
        
        request(server)
            .post('/location')
            .send(loc)
            .expect(201, done);
    });
        
});
