var keystone = require('keystone'),
    Location = keystone.list('Location'),
    Service = keystone.list('Service');

exports = module.exports = function (done) {

    Service.model.find().then(function (services) {

        services.forEach(function (service) {

            console.log(service.title);
            console.log("doc.locationNid: " + service.locationNid);

            Location.model.find({
                nid: service.locationNid
            }).then(function (locations) {
                console.log(locations);

                service.set('location', locations[0]._id);
                service.save();
            });

        })
    });
    
    setTimeout(done, 2000);

};