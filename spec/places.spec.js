require('jasmine-expect');
var request = require('supertest');

describe('places', function () {

    var server, place_id, place;
    var prefix = "/api/v1";
    
    beforeEach(function () {
        server = require('../server');
    });

    afterEach(function () {
        server.close();
    });

    it('can post a place', function(done) {
        
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
            .post(prefix+'/places')
            .send(loc)
            .expect(201)
            .end(function(err, resp){
                expect(err).toBeNull();
            
                place_id = resp.body._id;
                done();
            });
    });
    
    it('requires geo header or bounds to find places', function(done){
        
        request(server)
            .get(prefix+'/places')
            .expect(400, done);
    });
    
    it('can get nearby places', function(done) {
        
        var lat = 44.9 + (Math.random() - 0.5);
        var lon = -93.2 + (Math.random() - 0.5);
        
        var geo_header = {
            "Geo-Position": lat+","+lon+" epu=50 hdn=45 spd=15"
        };
        
        request(server)
            .get(prefix+'/places')
            .set(geo_header)
            .end(function(err, resp){
                expect(err).toBeNull();

                expect(resp.body.content).toBeArray();
                done();
            });
        
    });
    
    it('can get places within rect', function(done){
        
        var bounds = {
            xmin: -94,
            xmax: -92,
            ymin: 44,
            ymax: 46
        };
        
        request(server)
            .get(prefix+'/places')
            .query(bounds)
            .end(function(err, resp){
                expect(err).toBeNull();

                expect(resp.body.content).toBeArray();
                expect(resp.body.content.length).toBeGreaterThan(0);
            
                done();
            });
    });
    
    it('can get a place by id', function(done){
        
        request(server)
            .get(prefix+'/places/'+place_id)
            .end(function(err, resp){
            
                console.log(resp.body);
            
                expect(err).toEqual(null);
                done();
            });

    });
    
    it('can update a place', function(done){
        
        request(server)
            .put(prefix+'/places/'+place_id)
            .send(place)
            .end(function(err, resp){
                expect(err).toEqual(null);
                done();
            });

    });
    
    it('can delete a place', function(done){
        
        request(server)
            .delete(prefix+'/places/'+place_id)
            .end(function(err, resp){
                expect(resp.status).toEqual(200);
                done();
            });

    });
        
});
