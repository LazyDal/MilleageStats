var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var WellcomeBox = require('views/DashboardView/WellcomeBox.jsx');
var CarsPane = require('views/DashboardView/CarsPane.jsx');

var DashboardView = React.createClass({
  mixins: [Router.Navigation],
  getInitialState: function () {
    return ({SelectedView: 0});
  },
  handleNewCar: function (newCar) {
    this.props.handleNewCar(newCar);
    return;
  },
  render: function() {
    return(
      <div className = "contentSection">
        <WellcomeBox theCars={this.props.carsData} />
        <RouteHandler data={this.props.carsData} handleNewCar={this.handleNewCar} />
      </div>
    );
  }
});
module.exports = DashboardView;
