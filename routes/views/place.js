var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'places';
	locals.filters = {
		place: req.params.place
	};
	locals.data = {
        GOOGLE_BROWSER_KEY: process.env.GOOGLE_BROWSER_KEY
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Place').model.findOne({
			slug: locals.filters.place,
		});

		q.exec(function (err, result) {
            
            var arr = [result];

            keystone.populateRelated(arr, ['services'], function(){
                
                var place = arr[0];
                var services = place.services;
                
                place.services = place.services.map(function(s){
                    return JSON.parse(JSON.stringify(s));                    
                });
                
                locals.data.place = place;
                next(err);
            });

        });

	});

    
	// Render the view
	view.render('place');
};
