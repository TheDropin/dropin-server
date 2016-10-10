/**
 * Module dependencies.
 */
var passport = require('passport');
var login = require('connect-ensure-login');
var User = require('./models/user');

exports.index = function (req, res) {
    res.send('OAuth 2.0 Server');
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

exports.account = [
    passport.authenticate('bearer', {
        session: false,
        failWithError: true
    }),
    function (req, res) {
        var result = {
            username: req.user.username,
            _id: req.user._id,
            accounts: req.user.accounts
        };
        res.json(result);
    }
];
