var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Service Model
 * ==========
 */
var Service = new keystone.List('Service', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Service.add({
	title: { type: String, required: true },
    telephone: { type: String },
	place: { type: Types.Relationship, ref: 'Place', index: true },
    serviceType: { type: Types.Relationship, ref: 'ServiceType', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: { type: Types.Html, wysiwyg: true, height: 400 },
	source: { type: Types.Relationship, ref: 'DataSource', index: true }
});

Service.schema.virtual('content.full').get(function () {
	return this.content;
});

Service.defaultColumns = 'title, serviceType|20%, place|20%';
Service.register();
