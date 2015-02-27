var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

app.use('/', express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var userSchema = new mongoose.Schema({
  name: String,
  country: String,
  postalCode: Number,
  Cars: [{
    year: Number, brand: String, model: String, name: String, pictureFle: String,kmTraveled: Number, litresSpent: Number,
    fillups: [{ totalCost: Number, totalLiters: Number, fillingStation: String, date: Date, odometer: Number }],
    reminders: [{reminderText: String, dueDate: Date}]
  }]
});

dbURI="mongodb://LazyDal:JarMikAnd479@ds051977.mongolab.com:51977/milleage"
mongoose.connect(dbURI);

var User = mongoose.model( 'User', userSchema );

app.get('/api/cars', function(req, res) {
  User.findOne({'name' : 'Dalibor Dragojevic'}, // user called Dalibor Dragojevic
    'Cars',
    function (err, user) {
      if (!err) {
        console.log(user.Cars);
        res.json(user.Cars);
      } else {
        console.log(err);
        res.json({"status":"error", "error":"Error finding user"});
      }
    }
  );
});

app.listen(3000);
console.log('Server started: http://localhost:3000/');
