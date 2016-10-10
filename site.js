/**
 * Module dependencies.
 */
var passport = require('passport');
var login = require('connect-ensure-login');
var User = require('./models/user');

exports.index = function (req, res) {
    res.send('yo');
};

exports.registerForm = function (req, res) {
    res.render('register');
};

exports.register = function (req, res) {
    
    console.log(req.body);
    
    var user = new User(req.body);
    user.save(function(err, resp){
        if (err) {
            res.redirect('/register');
            return;
        }
        res.redirect('/login');
    });
};

exports.loginForm = function (req, res) {
    res.render('login');
};

exports.login = passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
});

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

exports.account = [
    loggedIn,
    function (req, res) {
        var result = {
            username: req.user.username,
            _id: req.user._id
        };
        res.json(result);
    }
];
