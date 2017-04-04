var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'locations';

    locals.data = {
		locations: [],
        GOOGLE_BROWSER_KEY: process.env.GOOGLE_BROWSER_KEY
	};

    // Load the locations
	view.on('init', function (next) {

        var q = keystone.list('Location').paginate({
			page: req.query.page || 1,
			perPage: 100,
			maxPages: 10
		});

        q.exec(function (err, results) {
			locals.data.locations = results;
			next(err);
		});
	});

	// Render the view
	view.render('locations');
};
