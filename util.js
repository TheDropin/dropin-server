module.exports.getGeoHeader = function(req) {

    var geo_header = req.headers['geo-position'];
    var parts = geo_header.split(' ');
    var lat_lng = parts[0].split(',');
    
    return lat_lng;
};