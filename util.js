module.exports.getGeoHeader = function(req) {

    var geo_header = req.headers['geo-position'];
    if (geo_header == null) return false;
    
    var parts = geo_header.split(' ');
    var coordinates = parts[0].split(',').map(parseFloat);
    
    return {
        coordinates: coordinates,
        latitude: coordinates[0],
        longitude: coordinates[1]
    };
};