var keystone = require('keystone'),
    ServiceType = keystone.list('ServiceType'),
    Service = keystone.list('Service');

exports = module.exports = function (done) {

    Service.model.find().then(function (services) {

        services.forEach(function (service) {

            console.log(service.title);
            console.log("service.type: " + service.type);

            ServiceType.model.find({
                nid: service.type
            }).then(function (types) {
                console.log(types);

                service.set('serviceType', types[0]._id);
                service.save();
            });

        })
    });
    
    setTimeout(done, 2000);

};