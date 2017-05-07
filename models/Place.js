var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Location Model
 * ==========
 */

var Place = new keystone.List('Place', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Place.add({
	title: { type: String, required: true },
    wkt: { type: String },
    address: { type: String },
    telephone: { type: String },
	location: { type: Types.Location, defaults: { city: 'Minneapolis' } },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: { type: Types.Html, wysiwyg: true, height: 400 },
	source: { type: Types.Relationship, ref: 'DataSource', index: true }
});

Place.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});


Place.relationship({ path: 'services', ref: 'Service', refPath: 'place' });


Place.defaultColumns = 'title, location|20%, author|20%, publishedDate|20%';
Place.register();
