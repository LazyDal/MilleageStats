var React = require('react');

var WellcomeBox = require('views/DashboardView/WellcomeBox');
var CarsPane = require('views/DashboardView/CarsPane');

var DashboardView = React.createClass({
  componentWillReceiveProps: function () {
    this.forceUpdate();
  },
  handleNewCar: function (newCar) {
    this.props.handleNewCar(newCar);
    return;
  },
  render: function() {
    return(
      <div className = "contentSection">
        <WellcomeBox />
        <RouteHandler data={this.props.carsData} handleNewCar={this.handleNewCar}/>
      </div>
    );
  }
});
module.exports = DashboardView;
