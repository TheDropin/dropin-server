var Location = require('../models/location');
var util = require('../util');

module.exports.get = function (req, res) {
    
    var bounds = false;
    var q = req.query;
    if (q.xmin && q.xmax && q.ymin && q.ymax) {
        bounds = q;
    }

    var geo = util.getGeoHeader(req);
    
    if (bounds) {
        Location.find({
            'geometry.coordinates': {
                $geoWithin: {
                    $box: [
                        [bounds.ymin, bounds.xmin],
                        [bounds.ymax, bounds.xmax]
                    ]
                }                      
            }                      
        }).exec(function (err, resp) {

            res.json({
                query: bounds,
                content: resp
            });
        });
        
    }
    else if (geo) {
    
        Location.aggregate().near({
            near: geo.coordinates,
            distanceField: "dist.calculated",
            maxDistance: 1000,
            query: {
    //            status: "approved"
            },
            uniqueDocs: true
        }).exec(function (err, resp) {

            res.json({
                query: geo,
                content: resp
            });
        });
        
    } else {
        return res.status(400).json({
            message: "Bounds or Geo-Position header required."
        });
    }
};


module.exports.post = function (req, res) {
    var loc = new Location(req.body);

    loc.save(function (err, resp) {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json(resp);
    });
};