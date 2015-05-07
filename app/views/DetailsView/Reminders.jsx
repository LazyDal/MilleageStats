var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;

var RemindersCollection = require('collections/reminders');
var Reminder = require('views/DetailsView/Reminder.jsx');
var NewReminderForm = require('views/DetailsView/NewReminderForm.jsx');
var EditReminderForm = require('views/DetailsView/EditReminderForm.jsx');

/************************/
/* remindersreminders        */
/* from AccordionWidget */
/************************/

// .get('reminderText')}</p>);
//
//         var reminder = this.props.reminders.at(i);
//        console.log(reminder);


var Reminders = React.createClass({
    mixins: [Navigation, Router.State],
    getInitialState: function (FillupId) {
      return ({ReminderId: ''});
    },
    handleClick: function (ReminderId) {
      this.setState({ReminderId: ReminderId});
    },
    newReminderClicked: function () {
      this.replaceWith('/Details/' + this.getParams().CarId + '/Reminders/NewReminder');
    },
    handleEditClick: function () {
      this.replaceWith('/Details/' + this.getParams().CarId + '/Reminders/EditReminder');
    },
    handleDeleteClick: function () {
      this.props.handleDeleteReminder(this.getParams().CarId, this.state.ReminderId);
    },
    render: function() {
      console.log('Inside Reminders');
      var selected = "";
      var that = this;
      var remindersView = new RemindersCollection(this.props.reminders);
      var sortedRemindersView = remindersView.sortBy('dueDate');
      var reminderNodes = sortedRemindersView.map(function (reminder) {
        if (location.hash.indexOf('Edit') > 0) { 
          if (that.state.ReminderId == reminder.get('_id')) {
            return (<EditReminderForm reminder={reminder} handleEditReminder={that.props.handleEditReminder} reminderId={that.state.ReminderId} />);  
          }
          else {
            return (<Reminder reminder={reminder} onReminderClick={that.handleClick} handleEditClick={that.handleEditClick} handleDeleteClick={that.handleDeleteClick} sel={selected} />);
          }
        }
        else {
          selected = "";
          if (that.state.ReminderId == reminder.get('_id')) {
            selected = "fillupSelected";
          }
          return (<Reminder reminder={reminder} onReminderClick={that.handleClick} handleEditClick={that.handleEditClick} handleDeleteClick={that.handleDeleteClick} sel={selected} />);
        }
      });
      var newReminder = <button type="button" className="btn btn-default" onClick={this.newReminderClicked}>New</button>;
      if (location.hash.indexOf('New') > 0) {
        reminderNodes.push(<NewReminderForm handleNewReminder={this.props.handleNewReminder} />);
        newReminder = "";
      }
      return(
        <div>
          <p>Reminders</p>
          {reminderNodes}
          {newReminder}
        </div>
      );
    }
});

module.exports = Reminders;
