var secret = process.env.JWT_SECRET || 'TEST SECRET ^5f85bf&F76%F876g5h76g980';

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user');


module.exports = function (passport) {
    var opts = {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    };

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({
            id: jwt_payload.id
        }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};