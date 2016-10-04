module.exports.getGeoHeader = function(req) {

    var geo_header = req.headers['geo-position'];
    var parts = geo_header.split(' ');
    var lat_lng = parts[0].split(',').map(parseFloat);
    
    return {
        latitude: lat_lng[0],
        longitude: lat_lng[1]
    };
};