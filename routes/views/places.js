var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'places';

    locals.data = {
		places: [],
        GOOGLE_BROWSER_KEY: process.env.GOOGLE_BROWSER_KEY
	};

    // Load the locations
	view.on('init', function (next) {

        var q = keystone.list('Place').paginate({
			page: req.query.page || 1,
			perPage: 100,
			maxPages: 10
		});

        q.exec(function (err, response) {
            keystone.populateRelated(response.results, ['services'], function(){
                console.log(response.results);
                
                locals.data.places = response.results;
                
                next(err);
            })
		});
	});

	// Render the view
	view.render('places');
};
