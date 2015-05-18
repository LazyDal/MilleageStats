var React = require('react');

var Reminders = require('views/DetailsView/Reminders.jsx');
var RemindersCollection = require('collections/reminders');
var UserRegistration = require('views/DashboardView/UserRegistration.jsx');
var SummaryStatistics = require('views/DashboardView/SummaryStatistics.jsx');
// var Reminders = require('views/DetailsView/Reminders');

var WellcomeBox = React.createClass({
  render: function() {
    var allReminders = [];
    this.props.theCars.map(function(car) {
      car.get('reminders').map(function(reminder) {
        allReminders.push(reminder);
      });
    });
     var remindersView = new RemindersCollection(allReminders);
     var sortedRemindersView = remindersView.sortBy('dueDate');
    return(
      <div className="wellcome-box-container">
        <div className="wellcome-box">
	        <UserRegistration />
	        <br />
              <SummaryStatistics />
	        <br />
              <p><b>Reminders</b></p>
              <Reminders className="welcomebox-list" reminders = {sortedRemindersView} addReminderButton={false} />
	  </div>
      </div>
    );
  }
});

module.exports = WellcomeBox;
