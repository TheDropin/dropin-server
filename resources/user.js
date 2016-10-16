var mongoose = require('mongoose');

var User = require('../models/user');
var jwt = require('jwt-simple');

var secret = process.env.JWT_SECRET || 'TEST SECRET';


exports.postUsers = function (req, res) {
    var user = new User(req.body);

    user.save(function (err, result) {
        if (err) {
            res.status(500).json(err);
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
        res.status(400).json({
            success: false,
            message: 'Please post username and password.'
        });
    } else {
        var newUser = new User(req.body);
        // save the user
        newUser.save(function (err) {
            if (err) {
                return res.status(409).json({
                    success: false,
                    message: 'Username already exists.'
                });
            }
            res.status(201).json({
                success: true,
                message: 'Successful created new user.',
                user: {
                    _id: newUser._id
                }
            });
        });
    }
};

module.exports.deleteUser = function(req, res) {
    User.findByIdAndRemove(req.param.id)
        .then(function(user){
            res.send(user);
        })
        .catch(function(err){
            res.status(404).send(err);
        });
};

module.exports.authenticate = function(req, res) {
    User.findOne({
        username: req.body.username
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

                    var token = jwt.encode(user, secret);

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
        username: "testUser",
        password: "testUser"
    };
    authenticate(req, res);
};
