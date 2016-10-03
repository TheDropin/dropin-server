var Location = require('../models/location');

module.exports.get = function(req, res) {

    var geo_header = req.headers['geo-position'];
    var parts = geo_header.split(' ');
    var lat_lng = parts[0].split(',');
    
    res.json({
        content: lat_lng
    });
};


module.exports.post = function (req, res) {
    var loc = new Location(req.body);

    loc.save(function(err, resp) {
        
        if (err) {
            return res.status(500).json(err);
        }
        
        res.status(201).json(resp);
    });
};