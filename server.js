var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var mongoose = require('mongoose');
var _= require('underscore');


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

var imgSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String
});


var carsSchema = new mongoose.Schema({
  _owner : { type: mongoose.Schema.ObjectId, ref: 'User' },
  _carImage: {type: mongoose.Schema.ObjectId, ref: 'Image'},
  year: Number,
  brand: String,
  model: String,
  name: String,
  kmTraveled: Number,
  fillups: [fillupsSchema],
  reminders: [remindersSchema]
})

var usersSchema = new mongoose.Schema({
  name: String,
  country: String,
  postalCode: Number,
  cars: [{ type: mongoose.Schema.ObjectId, ref: 'Car' }]
});

dbURI="mongodb://LazyDal:JarMikAnd479@ds051977.mongolab.com:51977/milleage"
mongoose.connect(dbURI);

var User = mongoose.model( 'User', usersSchema );
var Car = mongoose.model( 'Car', carsSchema );
var Fillup = mongoose.model( 'Fillup', fillupsSchema );
var Reminder = mongoose.model( 'Reminder', remindersSchema );
var Image = mongoose.model('Image', imgSchema);

app.get('/api/cars/:carId/image', function(req, res) {
   //   Image.findOne({"name": "image-image"}, function(err, image) {console.
   console.log('Returning image...');
   Car.findById(req.params.carId)
        .populate('_carImage')
        .exec(function(err,car) {
          if(!err) {
            console.log('carImage: ' + car._carImage);
              if (car._carImage === undefined) {
                Image.findOne({"name": "no-image"}, function(err, image) {
                  console.log("No-image data:" + image.contentType);
                  res.send(image.data);
                  console.log('No-image image returned.');
                });
              }
              else {
                var carImage = car._carImage;
                // res.writeHead(200, {'contentType': carImage.contentType});
                res.send(carImage.data);
                console.log('Car image returned.');
              }
          } else {
              console.log(err);
              res.end();
        }
  });
});

app.put('/api/cars/:carId/fillups', function(req, res) {
  Car.findOne({'_id': req.params.carId}, function (err, car) {
       if (req.body.fillup !== undefined) { 
          if (req.body.fillup._id !== undefined) {
            var fillup = car.fillups.id(req.body.fillup._id);
            fillup.totalCost = req.body.fillup.totalCost;
            fillup.totalLiters = req.body.fillup.totalLiters;
            fillup.fillingStation = req.body.fillup.fillingStation;
            fillup.odometer = req.body.fillup.odometer;
            fillup.date = req.body.fillup.date;
            fillup.save(function (err) {
              if(!err){
                console.log('Fillup updated:', fillup);
              }
              else  {
                console.log('Error: fillup NOT updated!');
              }
            });
          }
          else {
            car.fillups.push (new Fillup(req.body.fillup));
            console.log("Fillup added");
          }
          car.save( function( err ){
            if(!err){
              console.log('New cars saved.');
              res.json({"status":"O.K."});
            }
            else {
              res.end('Error while saving new Car!');
            }
          });
        }
    });
});

app.put('/api/cars/:carId/reminders', function(req, res) {
  Car.findOne({'_id': req.params.carId}, function (err, car) {
       if (req.body.reminder !== undefined) { 
          if (req.body.reminder._id !== undefined) {
            var reminder = car.reminders.id(req.body.reminder._id);
            reminder.reminderText = req.body.reminder.reminderText;
            reminder.dueDate = req.body.reminder.dueDate;
            reminder.save(function (err) {
              if (!err) {
                console.log('Reminder updated: ', reminder);
              }
              else {
                console.log('Error: reminder NOT updated!');
              }
            });
          }
          else {
            car.reminders.push(new Reminder(req.body.reminder));
            console.log("Reminder added");
          }

        // 3: SAVE the record
        car.save(function(err){
          if(!err){
            res.json({"status":"O.K."});
            console.log('Car updated:', car);
          }
          else  {
            console.log('Error: car NOT updated!');
            res.end();
          }
        });
        }
    });
});

app.get('/api/cars', function(req, res) {
  Car.find({}, function (err, cars) {
    if (!err) {
      res.send(cars);
    } else {
      console.log(err);
      res.end();
    }
  });
});

// app.post('/api/cars', function (req, res) {
//   var newCar = new Car({
//     year: req.body.year,
//     brand: req.body.brand,
//     model: req.body.model,
//     name: req.body.name,
//     pictureFile: req.body.pictureFile,
//     kmTraveled: req.body.kmTraveled
//   });
//   console.log(newCar);
//   newCar.save( function( err ){
//     if(!err){
//       console.log('New cars saved!');
//       res.json({"status":"O.K."});
//     }
//     else {
//       res.end();
//     }
//   });
// });

app.post('/api/cars', function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    if(err) return res.end();
    console.log('received fields:');
    console.log(fields);
    console.log('received files:');
    console.log(files);

    newCar = new Car(fields);

    if (files.carImage.size > 0) {
      var carImage = new Image;
      carImage.data = fs.readFileSync(files.carImage.path);
      carImage.contentType = 'image/jpg';
      newCar._carImage = carImage;
      carImage.save(function (err) {
        if(!err){
          console.log('Image saved to mongo');
        }
        else  {
          console.log('Error: image NOT saved!');
        }
      });
    }
    newCar.save( function( err ){
      if(!err){
        console.log('New cars saved.');
        res.json({"status":"O.K."});
      }
      else {
        res.end('Error while saving new Car!');
      }
    });
  });
});

app.put('/api/cars', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    Car.findOne({_id : fields._id}, function(err, car) {
      if(!err){
        // 2: EDIT the record
        if (fields.year !== 0) car.year = fields.year;
        if (fields.brand !== "Brand") car.brand = fields.brand;
        if (fields.model !== "Model") car.model = fields.model;
        if (fields.name !== "Car Name") car.name = fields.name;
        if (fields.kmTraveled !== -1) car.kmTraveled = fields.kmTraveled;
        if (files.carImage.size > 0) {
          var oldImage = car._carImage;

          var carImage = new Image;
          carImage.data = fs.readFileSync(files.carImage.path);
          carImage.contentType = 'image/jpg';
          car._carImage = carImage;
          carImage.save(function (err) {
            if(!err){
              console.log('Image saved to mongo');
            }
            else  {
              console.log('Error: image NOT saved!');
            }
          });
          
          Image.remove({_id: oldImage}, function (err){
            if (!err){
              console.log("Cars deleted");
            }
            else {
              console.log("Error! Oldimage: " + oldImage);
            }
          });
        }
        
        
        else if (req.body.reminder !== undefined) {
          if (req.body.reminder._id !== undefined ) {
            var reminder = car.reminders.id(req.body.reminder._id);
            reminder.reminderText = req.body.reminder.reminderText;
            reminder.dueDate = req.body.reminder.dueDate;
            reminder.save(function (err) {
              if (!err) {
                console.log('Reminder updated: ', reminder);
              }
              else {
                console.log('Error: reminder NOT updated!');
              }
            });
          }
          else {
            car.reminders.push(new Reminder(req.body.reminder));
            console.log("Reminder added");
          }
        }

        // 3: SAVE the record
        car.save(function(err){
          if(!err){
            res.json({"status":"O.K."});
            console.log('Car updated:', car);
          }
          else  {
            console.log('Error: car NOT updated!');
            res.end();
          }
        });
      }
    });
  });
});

app.delete('/api/cars/:id', function (req, res) {
  var carImage = Car.findById(req.params.carId)._carImage;
  Car.remove({ _id : req.params.id } , function (err){
    if (!err){
      console.log("Cars deleted");
      Image.remove({_id:carImage},  function (err){
        if (!err)
          console.log("Image deleted");
        res.json({"status":"O.K."});
      });
    }
  });
});

app.delete('/api/cars/:id/fillups/:fillupId', function (req, res) {
  Car.findOne({_id : req.params.id }, function(err, car) {
    car.fillups.remove({_id : req.params.fillupId }, function(err, fillup) {
       if (!err) {
        console.log("Fillup deleted: fillup id " + req.params.fillupId);
       }
       else {
        console.log("Error while deleting fillup!");
       }
    });
    car.save(function(err){
      if(!err){
        res.send(car);
        console.log('Car updated:', car);
      }
      else  {
        console.log('Error: car NOT updated!');
        res.end();
      }
    });
  });
});

app.delete('/api/cars/:id/reminders/:reminderId', function (req, res) {
  Car.findOne({_id : req.params.id }, function(err, car) {
    car.reminders.remove({_id : req.params.reminderId }, function(err, fillup) {
       if (!err) {
        console.log("Reminder deleted: reminder id " + req.params.reminderId);
       }
       else {
        console.log("Error while deleting reminder!");
       }
    });
    car.save(function(err){
      if(!err){
        res.send(car);
        console.log('Car updated:', car);
      }
      else  {
        console.log('Error: car NOT updated!');
        res.end();
      }
    });
  });
});

app.listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});

// var dalibor = new User({
//   name: 'Dalibor Dragojevic',
//   country: 'Serbia',
//   postalCode: 13000
// });

// dalibor.save(function (err) {
//   if (err) {
//     console.log('Error while saving user!');
//   }
//   else {
//      console.log('User Dalibor saved');
//   }
// });
// var dalibor = new User({
//   name: 'Dalibor Dragojevic',
//   country: 'Serbia',
//   postalCode: 13000
// });

// dalibor.save(function (err) {
//   if (err) {
//     console.log('Error while saving user!');
//   }
//   else {
//      console.log('User Dalibor saved');
//   }
// });

// var dalibor = User.findOne({'name' : 'Dalibor Dragojevic'});

// var ford = new Car({
//   year: 2011,
//   brand: "Ford",
//   model: "Escort",
//   name:"Пословна Кола",
//   pictureFle:"img/car1",
//   kmTraveled: 32,
//   litresSpent: 12,
//   _owner: dalibor._id
// });
// ford.fillups.push(new Fillup({totalCost: 60,  totalLiters: 68, fillingStation: "Prle", odometer: 15455, date: new Date("Dec 25, 2014")}));
// ford.fillups.push(new Fillup({totalCost: 57,  totalLiters: 42, fillingStation: "Krle", odometer: 15565, date: new Date("Jan 23, 2015")}));
// ford.reminders.push(new Reminder({reminderText: "Change tires", dueDate: new Date("Feb 25, 2015")}));
// ford.save( function( err ){
//   if(!err){
//     console.log('Ford saved.');
//   }
//   else {
//     console.log('Error while saving car Ford!');
//   }
// });

// var opel = new Car({
//   year: 2011,
//   brand: "Opel",
//   model: "Meriva A",
//   name:"Кућевна Кола",
//   pictureFle:"img/car1",
//   kmTraveled: 15,
//   litresSpent: 6,
//   _owner: dalibor._id
// });
// opel.save(function (err) {
//  if (err) {
//    console.log('Error while saving opel!');
//  }
// });
// console.log('New cars saved.');

// User.remove({ name : /Dalibor/ } , function (err){
//   if (!err){
//     console.log('All users with "Dalibor" in their name were deleted.');
//   }
// });


// 1: FIND the record
  // User.findOne(
  //   {name : 'Dalibor Dragojevic'},
  //   function(err, user) {
  //     if(!err){
  //       // 2: EDIT the record
  //       user.Cars.map(function (car) {
  //         if (car.name == 'Кућевна Кола') {
  //           car.fillups.push({
  //             totalCost: 60, totalLiters: 50, fillingStation: "Zoran", odometer: 15826, date: new Date("Feb 7, 2015")
  //           });
  //         }
  //       });
  //       user.save( function( err ){
  //         if(!err) {
  //           console.log('User updated!');
  //         }
  //       });
  //     }
  // });

  //
  // var opel = Car.findOne({ brand: 'Opel' });
  // opel.fillups.push({
  //   totalCost: 60, totalLiters: 68, fillingStation: "Prle", odometer: 15455, date: new Date("Dec 25, 2014")
  // });
  // opel.fillups.push({
  //   totalCost: 57, totalLiters: 42, fillingStation: "Krle", odometer: 15565, date: new Date("Jan 23, 2015")
  // });
  // opel.reminders.push({
  //   reminderText: "Change tires",
  //   dueDate: new Date("Feb 25, 2015")
  // });
  // opel.save( function( err ){
  //   if(!err){
  //     console.log('Opel fillups and reminders saved.');
  //   }
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
