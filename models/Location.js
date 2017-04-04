var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Location Model
 * ==========
 */

var Location = new keystone.List('Location', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Location.add({
	title: { type: String, required: true },
    wkt: { type: String },
    address: { type: String },
    telephone: { type: String },
	location: { type: Types.Location, defaults: { city: 'Minneapolis' } },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: { type: Types.Html, wysiwyg: true, height: 400 }
});

Location.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Location.defaultColumns = 'title, location|20%, author|20%, publishedDate|20%';
Location.register();
