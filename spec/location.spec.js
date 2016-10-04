require('jasmine-expect');
var request = require('supertest');

describe('locations', function () {

    var server, location_id;
    
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
            .expect(201)
            .end(function(err, resp){
                expect(err).toBeNull();
            
                location_id = resp._id;
                done();
            });
    });
    
    
    it('can get nearby locations', function(done) {
        
        var geo_header = {
            "Geo-Position": "44.9,-93.3 epu=50 hdn=45 spd=15"
        };
        
        request(server)
            .get('/location')
            .set(geo_header)
            .end(function(err, resp){
                expect(err).toBeNull();

                expect(resp.body.content).toBeArray();
                done();
            });
        
    });
    
    it('can delete a location', function(done){
        
        request(server)
            .delete('/location/'+location_id)
            .end(function(err, resp){
                expect(err).toBeNull();
                done();
            });
        
        
    });
        
});
