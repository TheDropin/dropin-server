var keystone = require('keystone');
var async = require('async');
var Q = require('q');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Init locals
    locals.section = 'firebase_export';

    locals.data = {
        places: {},
        services: {},
        service_types: {},
        data_sources: {}
    };

    // Load the locations
    view.on('init', function (next) {
        
        
        keystone.list('Place').model.find().exec(function (err, places){
        keystone.list('Service').model.find().populate('serviceType').exec(function (err, services){
        keystone.list('ServiceType').model.find().exec(function (err, serviceTypes){
            
            var data = {
                places: {}
            };
            
            places = places.map(function(p){
                p = JSON.parse(JSON.stringify(p))
                delete p.nid;
                delete p.slug;
                p.services = {};
                return p;
            });
            
            places.forEach(function(p){
                var id = p._id;
                delete p._id;
                data.places[id] = p;
            });
            
            services = services.map(function(s){
                s = JSON.parse(JSON.stringify(s))
                delete s.locationNid;
                delete s.slug;
                delete s.type;
                delete s.location;
                
                s.source = "St. Stephen's Handbook of the Streets";
                
                console.log('service:');
                console.log(s);
                s.serviceType = s.serviceType? s.serviceType.title : null;
                return s;
            });

            services.forEach(function(s){
                var placeId = s.place;
                var serviceId = s._id;
                if (data.places[placeId]) {
                    delete s.place;
                    delete s._id;
                    data.places[placeId].services[serviceId] = s;
                }
            });

            locals.data = data;
            
            next(err);
        });
        });
        });
/*
        var q = keystone.list('Place').paginate({
            page: req.query.page || 1,
            perPage: 100,
            maxPages: 10
        });

        q.exec(function (err, response) {
            keystone.populateRelated(response.results, ['services'], function () {
                
                var promises = [];

                response.results.forEach(function (p) {
                    
                    var def = Q.defer();

                    var services = JSON.parse(JSON.stringify(p.services))

                    var id = p._id;

                    var newPlace = JSON.parse(JSON.stringify(p))

                    delete newPlace._id;
                    delete newPlace.nid;
                    delete newPlace.slug;

                    newPlace.services = services.map(function (s) {
                        delete s._id;
                        delete s.nid;
                        delete s.slug;
                        delete s.place;
                        delete s.locationNid;
                        delete s.location;
                        return s;
                    })

                    console.log(newPlace.services);

                    locals.data.places[id] = newPlace;                    
                    
//                    keystone.populateRelated(p.services, ['serviceType'], function() {
//                        console.log(p.services);
                        def.resolve();
//                    });

                    promises.push(def.promise);

                });
                
                Q.all(promises).then(function(){
                    next(err);
                });

            })
        });
*/
    });

    // Render the view
    view.render('firebase_export');
};
