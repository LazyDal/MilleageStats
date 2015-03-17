var React = require('react');

var WellcomeBox = require('views/DashboardView/WellcomeBox');
var CarsPane = require('views/DashboardView/CarsPane');

var DashboardView = React.createClass({displayName: "DashboardView",
  render: function() {
    return(
      React.createElement("div", {className: "contentSection"},
        React.createElement(WellcomeBox, null),
        React.createElement(CarsPane, {data: this.props.carsData})
      )
    );
  }
});
module.exports = DashboardView;
