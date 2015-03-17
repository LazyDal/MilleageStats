var React = require('react');

var UserRegistration = require('views/DashboardView/UserRegistration');
var SummaryStatistics = require('views/DashboardView/SummaryStatistics');
// var Reminders = require('views/DetailsView/Reminders');

var WellcomeBox = React.createClass({
  render: function() {
    return(
      <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
        <UserRegistration />
        <SummaryStatistics />
        <div><p>All reminders</p></div>
      </div>
    );
  }
});

module.exports = WellcomeBox;
