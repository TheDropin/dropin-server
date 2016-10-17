var express = require('express');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var bodyParser = require('body-parser');
var morgan = require('morgan');

var passport = require('passport');
require('./config/passport')(passport);

var db_url = process.env.MONGODB_URI || 'mongodb://localhost:27017/dropin';

mongoose.connect(db_url, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

var app = express();

app.use(morgan('dev')); // log every request to the console

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization,Geo-Position");
    res.header("Access-Control-Allow-Methods", "HEAD,GET,POST,PUT,DELETE,OPTIONS,TRACE,CONNECT");

    next();
});

var api = express.Router();

api.get('/', function (req, res) {
    res.status(200).json({
        message: 'OK'
    });
});

var placesResource = require('./resources/places');
var userResource = require('./resources/user');

var jwtAuth = passport.authenticate('jwt', { session: false});

api.route('/places')
    .post(placesResource.post)
    .get(placesResource.get);

api
    .post('/signup', userResource.signup)
    .post('/authenticate', userResource.authenticate);

api.route('/users')
    .post(userResource.postUsers)
    .get([jwtAuth, userResource.getUsers]);

api.route('/users/:id')
//    .get([jwtAuth, userResource.getUser])
    .delete([jwtAuth, userResource.deleteUser]);

app.use('/api/v1', api);

var server = app.listen(process.env.PORT || 5001, function () {
    var port = server.address().port;
    console.log('Express listening at port %s', port);
});


module.exports = server;