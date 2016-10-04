var Location = require('../models/location');
var util = require('../util');

module.exports.get = function (req, res) {

    var geo = util.getGeoHeader(req);
    if (!geo) {
        return res.status(400).json({
            message: "Geo-Position header required."
        });
    }

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