var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var flash    = require('connect-flash');

var passport = require('passport');
var authController = require('./controllers/auth');

var db_url = process.env.MONGODB_URI || 'mongodb://localhost:27017/dropin';

mongoose.connect(db_url, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

var app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization,Geo-Position");
    res.header("Access-Control-Allow-Methods", "HEAD,GET,POST,PUT,DELETE,OPTIONS,TRACE,CONNECT");
    
    next();
});

var site = require('./site');

app.get('/', site.index);
app.get('/register', site.registerForm);
app.post('/register', site.register);
app.get('/login', site.loginForm);
app.post('/login', site.login);
app.get('/logout', site.logout);
app.get('/account', [authController.checkLocalAuth, site.account]);

var api = express.Router();

api.get('/', function (req, res) {
    res.status(200).json({
        msg: 'OK'
    });
});

var locationResource = require('./resources/location');
var userResource = require('./resources/user');

api.route('/location')
    .post(locationResource.post)
    .get(locationResource.get);

api.route('/users')
  .post(userResource.postUsers)
  .get(userResource.getUsers);

app.use('/api/v1', api);

var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log('Express listening at port %s', port);
});


module.exports = server;