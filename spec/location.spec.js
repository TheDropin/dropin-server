require('jasmine-expect');
var request = require('supertest');

describe('locations', function () {

    var server, location_id;
    var prefix = "/api/v1";
    
    beforeEach(function () {
        server = require('../server');
    });

    afterEach(function () {
        server.close();
    });

    it('can post a location', function(done) {
        
        var lat = 44.9 + (Math.random() - 0.5);
        var lon = -93.2 + (Math.random() - 0.5);
        
        var loc = {
            description: 'test',
            status: 'test',
            geometry: {
                coordinates: [lat,lon]
            }
        };
        
        request(server)
            .post(prefix+'/location')
            .send(loc)
            .expect(201)
            .end(function(err, resp){
                expect(err).toBeNull();
            
                location_id = resp._id;
                done();
            });
    });
    
    it('requires geo header or bounds to find locs', function(done){
        
        request(server)
            .get(prefix+'/location')
            .expect(400, done);
    });
    
    it('can get nearby locations', function(done) {
        
        var lat = 44.9 + (Math.random() - 0.5);
        var lon = -93.2 + (Math.random() - 0.5);
        
        var geo_header = {
            "Geo-Position": lat+","+lon+" epu=50 hdn=45 spd=15"
        };
        
        request(server)
            .get(prefix+'/location')
            .set(geo_header)
            .end(function(err, resp){
                expect(err).toBeNull();

                expect(resp.body.content).toBeArray();
                done();
            });
        
    });
    
    it('can get locations within rect', function(done){
        
        var bounds = {
            xmin: -94,
            xmax: -92,
            ymin: 44,
            ymax: 46
        };
        
        request(server)
            .get(prefix+'/location')
            .query(bounds)
            .end(function(err, resp){
                expect(err).toBeNull();

                expect(resp.body.content).toBeArray();
                expect(resp.body.content.length).toBeGreaterThan(0);
            
                done();
            });
    });
    
    it('can delete a location', function(done){
        
        request(server)
            .delete(prefix+'/location/'+location_id)
            .end(function(err, resp){
                expect(err).toBeNull();
                done();
            });

    });
        
});
