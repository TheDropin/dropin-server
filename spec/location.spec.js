require('jasmine-expect');
var request = require('supertest');

describe('locations', function () {

    var server;
    
    beforeEach(function () {
        server = require('../server');
    });

    afterEach(function () {
        server.close();
    });

    it('can post a location', function(done) {
        
        var loc = {
            description: 'test',
            longitude: 1,
            latitude: 1,
            status: 'test'
        };
        
        request(server)
            .post('/location')
            .send(loc)
            .expect(201, done);
    });
    
    
    it('can get nearby locations', function(done) {
        
        var loc = {
            latitude: 44.9,
            longitude: -93.3
        };
        
        request(server)
            .get('/location')
            .end(function(err, resp){
                expect(err).toBeNull();
            
                expect(resp.content).toBeArray();
            });
        
    });
        
});
