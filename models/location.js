var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: "Feature"
    },
    geometry: {
        type: {
            type: String,
            default: "Point",
            required: true
        },
        coordinates: {
            type: [Number, Number],
            index: '2d'
        }
    },
    properties: {
        name: {
            type: String
        },
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "new"
    },
    source: {
        type: Object,
        required: true,
        default: "DropIn App"
    }
}, {
    timestamps: true
});

        module.exports = mongoose.model('Location', Schema);