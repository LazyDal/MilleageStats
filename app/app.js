var Backbone = require('backbone');
var _ = require('underscore');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
  Link=Router.Link, RouteHandler = Router.RouteHandler;

var Car = require('models/car');
var Cars = require('collections/cars');

var HeaderComponent = require('views/HeaderComponent');
var DetailsView = require('views/DetailsView');
var DashboardView=require('views/DashboardView');
var CarsPane=require('views/DashboardView/CarsPane');
var CarDetailsPane=require('views/DashboardView/CarsPane');
var NewCarForm=require('views/DashboardView/NewCarForm');
var EditCarForm=require('views/DetailsView/EditCarForm');
var AccordionWidget = require('views/DetailsView/AccordionWidget');
var Reminders = require('views/DetailsView/Reminders');
var FillupsView = require('views/DetailsView/FillupsView');
var FillupDetailsView = require('views/DetailsView/FillupDetailsView');
var NewFillupForm = require('views/DetailsView/NewFillupForm');

var theCars = new Cars();

theCars.fetch();

var App = React.createClass({displayName: "App",
  getInitialState: function () {
    return {cars: [], synced: false };
  },
  componentDidMount: function () {
    theCars.on('sync', function() {
      console.log("synced");
      this.setState({cars: theCars, synced: true});
    }.bind(this));
    this.setState({cars: theCars, synced: true});
  },
  handleNewCar: function (newCar) {
    console.log("Inside handleNewCar");
    theCars.add(newCar);
    this.setState({cars:theCars, synced:true});
    location.hash="/Dashboard";
  },
  handleEditCar: function () {

  },
  handleDeleteCar: function () {

  },
  render: function () {
    if (this.state.synced) {
      console.log('From App: ');
      var carCards = this.state.cars.map(function (acar) {
        console.log(acar.get("_id"));
      });
      console.log(this.state.cars);
      return (
        React.createElement("div", null, 
          React.createElement(HeaderComponent, null), 
          React.createElement(RouteHandler, {carsData: this.state.cars, handleNewCar: this.handleNewCar, handleEditCar: this.handleEditCar, handleDeleteCar: this.handleDeleteCar})
        )
      );
    }
    else {
      return (React.createElement("div", null, React.createElement(HeaderComponent, null)));
    }
  }
});

var routes = (
  React.createElement(Route, {name: "App", path: "/", handler: App}, 
    React.createElement(Route, {name: "Details", path: "Details", handler: DetailsView}, 
      React.createElement(Route, {name: "CarDetails", path: ":CarId", handler: AccordionWidget}, 
        React.createElement(Route, {name: "CarDetailsPane", path: "", handler: CarDetailsPane}), 
        React.createElement(Route, {name: "Reminders", path: "Reminders", handler: Reminders}), 
        React.createElement(Route, {name: "Fillups", path: "Fillups", handler: FillupsView}, 
          React.createElement(Route, {name: "FillupDetails", path: ":FillupId", handler: FillupDetailsView})
        ), 
        React.createElement(Route, {name: "NewFillup", path: "NewFillup", handler: NewFillupForm})
      ), 
      React.createElement(Route, {name: "EditCar", path: ":CarId/EditCar", handler: EditCarForm})
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
