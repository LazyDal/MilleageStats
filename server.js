var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

app.use('/', express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var fillupsSchema = new mongoose.Schema({
  totalCost: Number,
  totalLiters: Number,
  fillingStation: String,
  date: Date,
  odometer: Number
});

var remindersSchema = new mongoose.Schema({
  reminderText: String,
  dueDate: Date
});

var carsSchema = new mongoose.Schema({
  year: Number,
  brand: String,
  model: String,
  name: String,
  pictureFle: String,
  kmTraveled: Number,
  litresSpent: Number,
  fillups: [fillupsSchema],
  reminders: [remindersSchema]
})

var usersSchema = new mongoose.Schema({
  name: String,
  country: String,
  postalCode: Number,
  Cars: [carsSchema]
});

dbURI="mongodb://LazyDal:JarMikAnd479@ds051977.mongolab.com:51977/milleage"
mongoose.connect(dbURI);

var User = mongoose.model( 'User', usersSchema );
var Cars = mongoose.model( 'Cars', carsSchema );
var fillups = mongoose.model( 'fillups', fillupsSchema );
var reminders = mongoose.model( 'reminders', remindersSchema );

// var user = new User({
//   name: 'Dalibor Dragojevic',
//   country: 'Serbia',
//   postalCode: 13000
// });
//
// user.save( function( err ){
//   if(!err){
//     console.log('New user saved!');
//   }
// });

// User.findOne({'name' : 'Dalibor Dragojevic'},
//   'Cars',
//   function (err, user) {
//     if(!err){
//       user.Cars.push({
//         year: 2011,
//         brand: "Ford",
//         model: "Escort",
//         name:"Пословна Кола",
//         pictureFle:"img/car1",
//         kmTraveled: 32,
//         litresSpent: 12,
//         selected: "false"
//       });
//       user.Cars.push({
//         year: 2011,
//         brand: "Opel",
//         model: "Meriva A",
//         name:"Кућевна Кола",
//         pictureFle:"img/car1",
//         kmTraveled: 15,
//         litresSpent: 6,
//         selected: "false"
//       });
//       user.Cars.map(function (car) {
//         if (car.name == 'Пословна Кола') {
//           car.fillups.push({
//             totalCost: 60, totalLiters: 68, fillingStation: "Prle", odometer: 15455, date: new Date("Dec 25, 2014")
//           });
//           car.fillups.push({
//             totalCost: 57, totalLiters: 42, fillingStation: "Krle", odometer: 15565, date: new Date("Jan 23, 2015")
//           });
//           car.reminders.push({
//             reminderText: "Change tires",
//             dueDate: new Date("Feb 25, 2015")
//           });
//         }
//         if (car.name == 'Кућевна Кола') {
//           car.fillups.push({
//             totalCost: 72, totalLiters: 62, fillingStation: "Srle", odometer: 15602, date: new Date("Jan 4, 2015")
//           });
//           car.reminders.push({
//             reminderText: "Check oil",
//             dueDate: new Date("Feb 14, 2015")
//           });
//           car.reminders.push({
//             reminderText: "Change tires",
//             dueDate: new Date("May 25, 2015")
//           });
//         }
//       });
//     }
//     user.save( function( err ){
//       if(!err){
//         console.log('User saved!');
//       }
//     });
// });

// User.remove({'name' : 'Dalibor Dragojevic'} , function (err){
//   if (!err){
//     console.log('All users with name "Dalibor Dragojevic" in their name were deleted');
//   }
// });

// 1: FIND the record
  // User.findOne(
  //   {name : 'Dalibor Dragojevic'},
  //   function(err, user) {
  //     if(!err){
  //       // 2: EDIT the record
  //       user.Cars.findOne(
  //         {brand: 'Opel'},
  //         function (err, car) {
  //           if(!err) {
  //             car.fillups.findOne(
  //               {fillingStation: 'Krle'},
  //               function (err, fillup) {
  //                 if(!err) {
  //                   fillup.fillingStation = 'Zoran';
  //                   user.save(function(err,user){
  //                     console.log('User saved:', user);
  //                   });
  //                 }
  //             });
  //           }
  //       });
  //     }
  // });

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