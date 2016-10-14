var config = require('../config');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user');


module.exports = function (passport) {
    var opts = {
        secretOrKey: config.secret,
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