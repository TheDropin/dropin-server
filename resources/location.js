var Location = require('../models/location');

module.exports.get = function(req, res) {

    var geo = util.getGeoHeader(req);
    
    res.json({
        content: geo
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
