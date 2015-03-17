var React = require('react');

var UserRegistration = require('views/DashboardView/UserRegistration');
var SummaryStatistics = require('views/DashboardView/SummaryStatistics');
// var Reminders = require('views/DetailsView/Reminders');

var WellcomeBox = React.createClass({displayName: "WellcomeBox",
  render: function() {
    return(
      React.createElement("div", {className: "col-xs-12 col-sm-3 col-md-3 col-lg-3"}, 
        React.createElement(UserRegistration, null), 
        React.createElement(SummaryStatistics, null), 
        React.createElement("div", null, React.createElement("p", null, "All reminders"))
      )
    );
  }
});

module.exports = WellcomeBox;
