var Location = require('../models/location');
var util = require('../util');

module.exports.get = function(req, res) {

    var geo = util.getGeoHeader(req);
    
    Location.find({}, function(err, resp){
        
        res.json({
            query: geo,
            content: resp
        });
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
