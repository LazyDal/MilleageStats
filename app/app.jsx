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

var App = React.createClass({
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
        <div>
          <HeaderComponent />
          <RouteHandler carsData={this.state.cars} handleNewCar={this.handleNewCar} handleEditCar={this.handleEditCar} handleDeleteCar={this.handleDeleteCar} />
        </div>
      );
    }
    else {
      return (<div><HeaderComponent /></div>);
    }
  }
});

var routes = (
  <Route name="App" path="/" handler={App}>
    <Route name="Details" path="Details" handler={DetailsView}>
      <Route name="CarDetails" path=":CarId" handler={AccordionWidget} >
        <Route name="CarDetailsPane" path="" handler={CarDetailsPane} />
        <Route name="Reminders" path="Reminders" handler={Reminders} />
        <Route name="Fillups" path="Fillups" handler={FillupsView} >
          <Route name="FillupDetails" path=":FillupId" handler={FillupDetailsView} />
        </Route>
        <Route name="NewFillup" path="NewFillup" handler={NewFillupForm} />
      </Route>
      <Route name="EditCar" path=":CarId/EditCar" handler={EditCarForm} />
    </Route>
    <Route name="Dashboard" handler={DashboardView}>
      <Route name="Cars" path="Cars" handler={CarsPane} />
    </Route>
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
