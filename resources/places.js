var Place = require('../models/place');
var util = require('../util');

module.exports.get = function (req, res) {
    
    var bounds = false;
    var q = req.query;
    if (q.xmin && q.xmax && q.ymin && q.ymax) {
        bounds = q;
    }

    var geo = util.getGeoHeader(req);
    
    if (bounds) {
        Place.find({
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
    
        Place.aggregate().near({
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


module.exports.put = function (req, res) {
    
    var loc = req.body;

    Place.findByIdAndUpdate(req.params.id, loc, function (err, resp) {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(resp);
    });
};

module.exports.getById = function(req, res) {
    
    Place.findById(req.params.id, function(err, resp){

        if (err) {
            return res.status(500).json(err);
        }

        res.json(resp);
    });
};


module.exports.deletePlace = function (req, res) {
    
    Place.findByIdAndRemove(req.params.id, function (err, resp) {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(resp);
    });
};


module.exports.post = function (req, res) {
    var loc = new Place(req.body);

    loc.save(function (err, resp) {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json(resp);
    });
};