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

var HeaderComponent = require('views/HeaderComponent');
var DetailsView = require('views/DetailsView');
var DashboardView=require('views/DashboardView');
var CarsPane=require('views/DashboardView/CarsPane');
var CarDetailsPane=require('views/DetailsView/CarDetailsTab');
var NewCarForm=require('views/DashboardView/NewCarForm');
var EditCarForm=require('views/DetailsView/EditCarForm');
var AccordionWidget = require('views/DetailsView/AccordionWidget');
var Reminders = require('views/DetailsView/Reminders');
var FillupsView = require('views/DetailsView/FillupsView');
var FillupDetailsView = require('views/DetailsView/FillupDetailsView');
var NewFillupForm = require('views/DetailsView/NewFillupForm');
var EditFillupForm = require('views/DetailsView/EditFillupForm');

    //   savingNewCar.done(function() {
    //   theCars.fetch();
    // });

      // updatingCar.done(function () {
      //   this.state.cars.fetch();
      // });

cars = new Cars();

var App = React.createClass({displayName: "App",
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
  handleEditCar: function (parameters, CarId) {
    console.log("Processing edit car");
    var car = cars.get(CarId);
    car.set({name: parameters.name, brand:parameters.brand, model:parameters.model, year:parameters.year, kmTraveled:parameters.kmTraveled, litresSpent:parameters.litresSpent});
    var updatingCar = Backbone.sync("update", car);

    this.transitionTo('/Details/' + this.getParams().CarId);
  },
  handleDeleteCar: function (CarId) {
    console.log('Deleting the car with id:' + CarId)
    Backbone.sync("delete", cars.get(CarId), {url:'/api/cars/' + CarId});
    cars.remove(CarId);
    this.transitionTo("/Details");
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
  render: function () {
    console.log('From App: ');
    var carCards = cars.map(function (car) {
      console.log(car.get("id"));
    });
    console.log(cars);
    return (
      React.createElement("div", null, 
        React.createElement(HeaderComponent, {status: this.state.status}), 
        React.createElement(RouteHandler, {carsData: cars, handleNewCar: this.handleNewCar, handleEditCar: this.handleEditCar, handleDeleteCar: this.handleDeleteCar, handleEditFillup: this.handleEditFillup})
      )
      );
  }
});

var routes = (
  React.createElement(Route, {name: "App", path: "/", handler: App}, 
    React.createElement(Route, {name: "Details", path: "Details", handler: DetailsView}, 
      React.createElement(Route, {name: "CarDetails", path: ":CarId", handler: AccordionWidget}, 
        React.createElement(Route, {name: "EditCar", path: "EditCar", handler: EditCarForm}), 
        React.createElement(Route, {name: "NewFillup", path: "NewFillup", handler: NewFillupForm}), 
        React.createElement(Route, {name: "Fillups", path: "Fillups", handler: FillupsView}, 
          React.createElement(Route, {name: "FillupDetails", path: ":FillupId", handler: FillupDetailsView}, 
            React.createElement(Route, {name: "EditFillup", path: "EditFillup", handler: EditFillupForm})
          )
        ), 
        React.createElement(Route, {name: "Reminders", path: "Reminders", handler: Reminders}), 
        React.createElement(DefaultRoute, {handler: CarDetailsPane})
      )
    ), 
    React.createElement(Route, {name: "Dashboard", handler: DashboardView}, 
      React.createElement(Route, {name: "Cars", path: "Cars", handler: CarsPane})
    ), 
    React.createElement(Route, {name: "NewCar", path: "NewCar", handler: NewCarForm}), 
    React.createElement(Route, {name: "Charts", handler: DetailsView}), 
    React.createElement(Route, {name: "Profile", handler: DetailsView}), 
    React.createElement(Route, {name: "Sign-out", handler: DetailsView}), 
    React.createElement(DefaultRoute, {handler: DashboardView})
  )
);

Router.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.body);
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
