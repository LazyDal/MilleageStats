var React = require('react');

var WellcomeBox = require('views/DashboardView/WellcomeBox');
var CarsPane = require('views/DashboardView/CarsPane');

var DashboardView = React.createClass({
  render: function() {
    return(
      <div className = "contentSection">
        <WellcomeBox />
        <CarsPane data={this.props.carsData} />
      </div>
    );
  }
});
module.exports = DashboardView;
