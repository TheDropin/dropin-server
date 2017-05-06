var keystone = require('keystone');
var Types = keystone.Field.Types;

var myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('./public/uploads/images'), // required; path where the files should be stored
        publicPath: '/uploads/images/', // path where files will be served
    },
    schema: {
        size: true,
        mimetype: true,
        path: true,
        originalname: true,
        url: true,
    }
});


/**
 * ServiceType Model
 * ==========
 */

var ServiceType = new keystone.List('ServiceType', {
    map: {
        name: 'title'
    },
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true
    },
});

ServiceType.add({
    title: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Types.Date,
        index: true,
        dependsOn: {
            state: 'published'
        }
    },
    image: {
        type: Types.CloudinaryImage
    },
    icon: {
        type: Types.File,
        storage: myStorage
    },
    content: {
        type: Types.Html,
        wysiwyg: true,
        height: 400
    }
});

ServiceType.schema.virtual('content.full').get(function () {
    return this.content;
});

ServiceType.relationship({
    path: 'services',
    ref: 'Service',
    refPath: 'serviceType'
});


ServiceType.defaultColumns = 'title, icon|20%';
ServiceType.register();