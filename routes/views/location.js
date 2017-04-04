var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'locations';
	locals.filters = {
		location: req.params.location,
	};
	locals.data = {
		locations: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Location').model.findOne({
			slug: locals.filters.location,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.location = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Location').model.find().populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.locations = results;
			next(err);
		});

	});

	// Render the view
	view.render('location');
};
