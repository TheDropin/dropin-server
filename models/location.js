var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Location', Schema);