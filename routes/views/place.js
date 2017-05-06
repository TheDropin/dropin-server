var keystone = require('keystone');
var Service = keystone.list('Service');
var ServiceType = keystone.list('ServiceType');


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'places';
	locals.filters = {
		place: req.params.place
	};
	locals.data = {
        place: true,
        GOOGLE_BROWSER_KEY: process.env.GOOGLE_BROWSER_KEY
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Place').model.findOne({
			slug: locals.filters.place,
		});

		q.exec(function (err, place) {
            
            place.populateRelated('services', function(err) {
                
                var serviceIds = place.services.map(function(s){ return s._id; });
                
                Service.model.find({_id:serviceIds}).populate('serviceType').exec(function(err, services){
                    
                    place.services = services;
                    locals.data.place = place;
                    next(err);
                    
                });
                
            });


        });

	});

    
	// Render the view
	view.render('place');
};
