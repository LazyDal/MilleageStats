var Backbone = require('backbone');
var _ = require('underscore');
var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var Navigation = require('react-router').Navigation;
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
  Link=Router.Link, RouteHandler = Router.RouteHandler;

var Car = require('models/car');
var Reminder = require('models/reminder');
var Fillup = require('models/fillup');
var Cars = require('collections/cars');
var Reminders = require('collections/reminders');
var Fillups = require('collections/fillups');

var HeaderComponent = require('views/HeaderComponent.jsx');
var DetailsView = require('views/DetailsView.jsx');
var DashboardView=require('views/DashboardView.jsx');
var CarsPane=require('views/DashboardView/CarsPane.jsx');
var CarDetailsPane=require('views/DetailsView/CarDetailsTab.jsx');
var NewCarForm=require('views/DashboardView/NewCarForm.jsx');
var EditCarForm=require('views/DetailsView/EditCarForm.jsx');
var AccordionWidget = require('views/DetailsView/AccordionWidget.jsx');
var Reminders = require('views/DetailsView/Reminders.jsx');
var FillupsView = require('views/DetailsView/FillupsView.jsx');
var FillupDetailsView = require('views/DetailsView/FillupDetailsView.jsx');
var NewFillupForm = require('views/DetailsView/NewFillupForm.jsx');
var EditFillupForm = require('views/DetailsView/EditFillupForm.jsx');
var NewReminderForm = require('views/DetailsView/NewReminderForm.jsx');
var EditReminderForm = require('views/DetailsView/EditReminderForm.jsx');

    //   savingNewCar.done(function() {
    //   theCars.fetch();
    // });

      // updatingCar.done(function () {
      //   this.state.cars.fetch();
      // });


cars = new Cars();

var App = React.createClass({
  mixins: [Navigation, Router.State],
  getInitialState: function () {
    return {status: "Syncing..." };
  },
  componentWillMount: function () {
    cars.fetch();
    cars.on('sync', function() {
      this.setState({status: "O.K."});
    }.bind(this));
    cars.on('request', function () {
      this.setState({status: "Syncing..."});
    }.bind(this));
    cars.on('error', function () {
      this.setState({status: "Server error!"})
    }.bind(this));
  },
  handleNewCar: function (newCar) {
    console.log("Inside handleNewCar");
    cars.add(newCar);
    var savingNewCar = newCar.save();
    savingNewCar.done(function() {
       cars.fetch();
    });
    this.transitionTo('/Dashboard');
  },
  handleEditCar: function (parameters, carId) {
    console.log("Processing edit car");
    var car = cars.get(carId);
    car.set({name: parameters.name, brand:parameters.brand, model:parameters.model, year:parameters.year, kmTraveled:parameters.kmTraveled, litresSpent:parameters.litresSpent});
    var updatingCar = Backbone.sync("update", car);

    this.transitionTo('/Details/' + this.getParams().carId);
  },
  handleDeleteCar: function (carId) {
    console.log('Deleting the car with id:' + carId)
    Backbone.sync("delete", cars.get(carId), {url:'/api/cars/' + carId});
    cars.remove(carId);
    this.transitionTo("/Details");
  },
  handleNewFillup: function (fillup, carId) {
    var fillups = cars.get(carId).get('fillups');
    fillups.push(fillup);
    var car = new Car();
    car.set({_id: carId});
    car.set({fillup: fillup});
    var updatingCar = Backbone.sync("update", car);
    updatingCar.done(function () {
      cars.fetch();
    });
    this.transitionTo('/Details/' + this.getParams().CarId + '/Fillups');
  },
  handleEditFillup: function(editedFillup, carId, fillupId) {
      var car = cars.get(carId);
      var fillups = car.get('fillups');
      that = this;
      fillups.map(function (fillup) {
        if (fillup._id == fillupId) {
            fillup.totalCost = editedFillup.totalCost;
            fillup.totalLiters = editedFillup.totalLiters;
            fillup.fillingStation = editedFillup.fillingStation;
            fillup.odometer = editedFillup.odometer;
            fillup.date = editedFillup.date;
            var carForServer = new Car(car.toJSON());
            carForServer.set('fillups', []);
            carForServer.set('reminders', []);
            carForServer.set('fillup', fillup);
            var updatingCar = Backbone.sync("update", carForServer);
            selected = "fillupSelected";
            that.transitionTo('/Details/' + carId + '/Fillups/' + fillupId);
        }
      });
  },
  handleDeleteFillup: function (carId, fillupId) {
    var car = cars.get(carId);
    Backbone.sync("delete", cars.get(carId), {url:'/api/cars/' + carId + '/fillups/' + fillupId});
    var fillups = car.get('fillups');
    that = this;
    var newFillups = _.filter(fillups, function (fillup) {
      if (fillup._id != fillupId) return fillup;
    });
    console.log(newFillups);
    car.set({fillups: newFillups});
    this.transitionTo('/Details/' + carId + '/Fillups');
  },
  handleNewReminder: function (reminder, carId) {
    var reminders = cars.get(carId).get('reminders');
    reminders.push(reminder);
    var car = new Car();
    car.set({_id: carId});
    car.set({reminder: reminder});
    var updatingCar = Backbone.sync("update", car);
    updatingCar.done(function () {
      cars.fetch();
    });
    this.transitionTo('/Details/' + this.getParams().CarId + '/Reminders');
  },
  handleEditReminder: function(editedReminder, carId, reminderId) {
      console.log("Updating the car on the server;");
      var car = cars.get(carId);
      var reminders = car.get('reminders');
      that = this;
      reminders.map(function (reminder) {
        if (reminder._id == reminderId) {
            reminder.reminderText = editedReminder.reminderText;
            reminder.dueDate = editedReminder.dueDate;
            var carForServer = new Car(car.toJSON());
            carForServer.set('fillups', []);
            carForServer.set('reminders', []);
            carForServer.set('reminder', reminder);
            var updatingCar = Backbone.sync("update", carForServer);
            selected = "fillupSelected";
            that.transitionTo('/Details/' + carId + '/Reminders');
        }
      });
  },
  handleDeleteReminder: function (carId, reminderId) {
    var car = cars.get(carId);
    Backbone.sync("delete", cars.get(carId), {url:'/api/cars/' + carId + '/reminders/' + reminderId});
    var reminders = car.get('reminders');
    var newReminders = _.filter(reminders, function (reminder) {
      if (reminder._id != reminderId) return reminder;
    });
    console.log(newReminders);
    car.set({reminders: newReminders});
    this.transitionTo('/Details/' + carId + '/Reminders');
  },
  render: function () {
    console.log('From New App: ');
    console.log('Function: ' + this.handleNewFillup);
    return (
      <div>
        <HeaderComponent status={this.state.status}/>
        <div className="backDrop clearfix">
          <RouteHandler carsData={cars} handleNewCar={this.handleNewCar} handleEditCar={this.handleEditCar} handleDeleteCar={this.handleDeleteCar} handleNewFillup={this.handleNewFillup} handleEditFillup={this.handleEditFillup} handleDeleteFillup={this.handleDeleteFillup} handleNewReminder={this.handleNewReminder} handleEditReminder={this.handleEditReminder} handleDeleteReminder={this.handleDeleteReminder}/>
        </div>
      </div>
      );
  }
});

var routes = (
  <Route name="App" path="/" handler={App}>
    <Route name="Details" path="Details" handler={DetailsView}>
      <Route name="CarDetails" path=":CarId" handler={AccordionWidget} >
        <Route name="EditCar" path="EditCar" handler={EditCarForm} />
        <Route name="Fillups" path="Fillups" handler={FillupsView} >
          <Route name="NewFillup" path="NewFillup" handler={NewFillupForm} />
          <Route name="FillupDetails" path=":FillupId" handler={FillupDetailsView} >
            <Route name="EditFillup" path="EditFillup" handler={EditFillupForm} />
          </Route>
        </Route>
        <Route name="Reminders" path="Reminders" handler={Reminders} >
          <Route name="NewReminder" path="NewReminder" handler={NewReminderForm} />
          <Route name="EditReminder" path="EditReminder" handler={EditReminderForm} />
        </Route>
        <DefaultRoute handler={CarDetailsPane}/>
      </Route>
    </Route>
    <Route name="Dashboard" handler={DashboardView} />
    <Route name="NewCar" path="NewCar" handler={NewCarForm} />
    <Route name="Charts" handler={DetailsView}/>
    <Route name="Profile" handler={DetailsView}/>
    <Route name="Sign-out" handler={DetailsView}/>
    <DefaultRoute handler={DashboardView}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
// React.render(<App cars = {cars} />, document.body);

// theCars.on('sync', function() {
//          if (this.state.status == "Syncing..") {
//             theCars.fetch();
//          }
//          else { 
//           this.setState({cars: theCars, status: "O.K."});
//         }
//     }.bind(this));
//     theCars.on('request', function () {
//       if (this.state.status == "Syncing..") {
//         this.setState({status: "Syncing..."});
//       }
//       else {
//         this.setState({status: "Syncing.."});
//       }
//     }.bind(this));
