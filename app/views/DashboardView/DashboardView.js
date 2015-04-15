var React = require('react');

var WellcomeBox = require('views/DashboardView/WellcomeBox');
var CarsPane = require('views/DashboardView/CarsPane');

var DashboardView = React.createClass({displayName: "DashboardView",
  componentWillReceiveProps: function () {
    this.forceUpdate();
  },
  handleNewCar: function (newCar) {
    this.props.handleNewCar(newCar);
    return;
  },
  render: function() {
    return(
      React.createElement("div", {className: "contentSection"}, 
        React.createElement(WellcomeBox, null), 
        React.createElement(RouteHandler, {data: this.props.carsData, handleNewCar: this.handleNewCar})
      )
    );
  }
});
module.exports = DashboardView;
