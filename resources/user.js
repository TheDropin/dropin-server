var User = require('../models/user');

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