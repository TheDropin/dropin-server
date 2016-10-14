var mongoose = require('mongoose');

var User = require('../models/user');
var jwt = require('jwt-simple');


exports.postUsers = function (req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err, result) {
        if (err) {
            res.send(err);
        }
        
        res.json(result);
    });
};


exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        
        res.json(users);
    });
};


module.exports.signup = function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({
            success: false,
            message: 'Please post username and password.'
        });
    } else {
        var newUser = new User({
            name: req.body.name,
            password: req.body.password
        });
        // save the user
        newUser.save(function (err) {
            if (err) {
                return res.status(409).json({
                    success: false,
                    message: 'Username already exists.'
                });
            }
            res.json({
                success: true,
                message: 'Successful created new user.'
            });
        });
    }
};

module.exports.authenticate = function(req, res) {
    User.findOne({
        name: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(400).send({
                success: false,
                message: 'User not found.'
            });
        } else {

            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {

                    var token = jwt.encode(user, config.secret);

                    res.json({
                        success: true,
                        token: 'JWT ' + token
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        message: 'Wrong password.'
                    });
                }
            });
        }
    });
};

module.exports.getTestUser = function (req, res) {
    req.body = {
        name: "testUser",
        password: "testUser"
    };
    authenticate(req, res);
};
