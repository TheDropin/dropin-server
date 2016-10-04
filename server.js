var express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db_url = process.env.MONGODB_URI || 'mongodb://localhost:27017/dropin';

mongoose.connect(db_url, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

var app = express();
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
    res.json(200, {msg: 'OK' });
  });

var locationResource = require('./resources/location');

app.post('/location', locationResource.post);
app.get('/location', locationResource.get);

module.exports = app.listen(process.env.PORT || 5000);
