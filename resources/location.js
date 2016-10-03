var Location = require('../models/location');

module.exports.post = function(req, res) {
    console.log(req.body);
    res.status(201).json({});
};
