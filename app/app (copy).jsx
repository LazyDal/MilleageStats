var Backbone = require('backbone');
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

var theCars = new Cars();

var App = React.createClass({
  getInitialState: function () {
    return {cars: [], synced: 'false' };
  },
  componentDidMount: function () {
    theCars.on('sync', function() {
       this.setState({cars: theCars, synced: 'true'});
    }.bind(this));

    theCars.on('error', function () {
      this.setState({synced: 'error'})
    }.bind(this));

    theCars.fetch();
  },
  render: function () {
    if (this.state.synced == 'true') {
      console.log('From App: ');
      var carCards = this.state.cars.map(function (acar) {
        console.log(acar);
      });
      console.log(this.state.cars);
      return (
        <div>
          <HeaderComponent />
          <RouteHandler carsData={this.state.cars} />
        </div>
      );
    }
    else if (this.state.synced == 'error') {
      return (
        <div>
          <h1>Error - could not connect to the server</h1>
        </div>
      );
    }
    else if (this.state.synced == 'false') {
      return (<div><HeaderComponent /></div>);
    }
  }
});

var routes = (
  <Route name="App" path="/" handler={App}>
    <Route name="Details" path="Details" handler={DetailsView}>
      <Route name="CarDetails" path=":CarId" handler={AccordionWidget} />
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
