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

var App = React.createClass({
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
        console.log(acar.get("_id"));
      });
      console.log(this.state.cars);
      return (
        <div>
          <HeaderComponent />
          <RouteHandler carsData={this.state.cars} />
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
        <Route name="Reminders" path="Reminders" handler={Reminders} />
        <Route name="Fillups" path="Fillups" handler={FillupsView} >
          <Route name="FillupDetails" path=":FillupId" handler={FillupDetailsView} />
        </Route>
      </Route>
    </Route>
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
