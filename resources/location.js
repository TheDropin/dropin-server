var Location = require('../models/location');

module.exports.post = function (req, res) {
    var loc = new Location(req.body);

    loc.save(function(err, resp) {
        res.status(201).json(resp);
    });
};