/**
 * Module dependencies.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var BasicStrategy = require('passport-http').BasicStrategy;
//var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
//var BearerStrategy = require('passport-http-bearer').Strategy;

var User = require('../models/user');
//var Client = require('./models/client');
//var Token = require('./models/token');

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            user.comparePassword(password, function (err, isMatch) {

                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


exports.checkLocalAuth = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};