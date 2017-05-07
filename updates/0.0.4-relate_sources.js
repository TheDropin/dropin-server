var keystone = require('keystone'),
    DataSource = keystone.list('DataSource'),
    Service = keystone.list('Service'),
    Place = keystone.list('Place');

exports = module.exports = function (done) {

    DataSource.model.findOne().then(function (ds) {

console.log(ds);
        
        Service.model.find().then(function (services) {

            services.forEach(function (service) {

                console.log(service.title);

                service.set('source', ds._id);
                service.save();

            })
        });
        
        Place.model.find().then(function (places) {

            places.forEach(function (place) {

                console.log(place.title);

                place.set('source', ds._id);
                place.save();

            })
        });

    });

    setTimeout(done, 2000);

};