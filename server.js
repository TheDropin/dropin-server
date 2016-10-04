var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db_url = process.env.MONGODB_URI || 'mongodb://localhost:27017/dropin';

mongoose.connect(db_url, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/'));


var api = express.Router();

api.get('/', function (req, res) {
    res.status(200).json({
        msg: 'OK'
    });
});

var locationResource = require('./resources/location');

api.post('/location', locationResource.post);
api.get('/location', locationResource.get);

app.use('/api/v1', api);

var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log('Express listening at port %s', port);
});


module.exports = server;