var request = require('supertest');

describe('users', function () {

    var server;
    var prefix = "/api/v1";
    
    var username = "test_user_"+ ~~(Math.random() * 1000000);
    var userId;
    
    beforeEach(function () {
        server = require('../server');
    });

    afterEach(function () {
        server.close();
    });

    it('can signup an account', function(done) {

        var user = {
            username: username,
            password: username,
            email: username+"@test.com"
        };
        
        request(server)
            .post(prefix+'/signup')
            .send(user)
            .end(function(err, res){
                expect(err).toBeNull();
            
                expect(res.body.success).toBeTrue();
                userId = res.body.user._id;
            
                done();
            });
    });
    
    it("can authenticate a user", function(done){

        var credentials = {
            username: username,
            password: username
        };
        
        request(server)
            .post(prefix+'/authenticate')
            .send(credentials)
            .end(function(err, res){
                expect(err).toBeNull();
            
                expect(res.body.token).toBeString();
            
                done();
            });
    });
    
    it("can delete an account", function(done){
        request(server)
            .delete(prefix+'/users/'+userId)
            .end(function(err, res){
                expect(err).toBeNull();
                done();
            });
    });
        
});