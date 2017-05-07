var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * DataSource Model
 * ==========
 */
var DataSource = new keystone.List('DataSource', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

DataSource.add({
	title: { type: String, required: true },
    link: { type: Types.Url },
	content: { type: Types.Html, wysiwyg: true, height: 400 }
});

DataSource.defaultColumns = 'title, link';
DataSource.register();
