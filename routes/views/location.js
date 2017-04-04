var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'locations';
	locals.filters = {
		location: req.params.location
	};
	locals.data = {
        GOOGLE_BROWSER_KEY: process.env.GOOGLE_BROWSER_KEY
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Location').model.findOne({
			slug: locals.filters.location,
		});

		q.exec(function (err, result) {
            
            var arr = [result];

            keystone.populateRelated(arr, ['services'], function(){
                locals.data.location = arr[0];
                next(err);
            });

        });

	});

    
	// Render the view
	view.render('location');
};
