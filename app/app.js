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
var AccordionWidget = require('views/DetailsView/AccordionWidget');
var Reminders = require('views/DetailsView/Reminders');
var FillupsView = require('views/DetailsView/FillupsView');
var FillupDetailsView = require('views/DetailsView/FillupDetailsView');

var theCars = new Cars();

var App = React.createClass({displayName: "App",
  getInitialState: function () {
    return {cars: [], synced: false };
  },
  componentDidMount: function () {
    theCars.on('sync', function() {
      this.setState({cars: theCars, synced: true});
    }.bind(this));

    theCars.fetch();
  },
  render: function () {
    if (this.state.synced) {
      console.log('From App: ');
      var carCards = this.state.cars.map(function (acar) {
        console.log(acar);
      });
      console.log(this.state.cars);
      return (
        React.createElement("div", null, 
          React.createElement(HeaderComponent, null), 
          React.createElement(RouteHandler, {carsData: this.state.cars})
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
        React.createElement(Route, {name: "Reminders", path: "Reminders", handler: Reminders}), 
        React.createElement(Route, {name: "Fillups", path: "Fillups", handler: FillupsView}, 
          React.createElement(Route, {name: "FillupDetails", path: ":FillupId", handler: FillupDetailsView})
        )
      )
    ), 
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
