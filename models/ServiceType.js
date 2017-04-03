var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ServiceType Model
 * ==========
 */

var ServiceType = new keystone.List('ServiceType', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

ServiceType.add({
//    nid: { type: Types.Number },
	title: { type: String, required: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: { type: Types.Html, wysiwyg: true, height: 400 }
});

ServiceType.schema.virtual('content.full').get(function () {
	return this.content;
});

ServiceType.defaultColumns = 'title, location|20%, type|20%, publishedDate|20%';
ServiceType.register();
