var React = require('react');
var Backbone = require('backbone');
var Router = require('react-router');
var $=require('jquery');
require('jquery-ui');

// TODO: send request to the server
// this.props.handleEditCar(new Car({brand: brand, model:model, name:name, kmTraveled:odometer, litresSpent:litres}));

var EditReminderForm = React.createClass({
  mixins: [Router.State],
  componentDidMount: function () {
   $( this.refs.date.getDOMNode()).datepicker();
  },
  handleSubmit: function(e) {
    e.preventDefault();
    console.log("Handling Edit Fillup submit");
    var reminderText = this.refs.reminderText.getDOMNode().value.trim();
    var dueDate = this.refs.dueDate.getDOMNode().value.trim();

    var reminder = this.props.reminder;
    if (reminderText == "") reminderText=reminder.get('reminderText');
    if (dueDate == "") dueDate=reminder.get('dueDate');

    this.props.handleEditReminder({reminderText: reminderText, dueDate:dueDate }, this.getParams().CarId, this.props.reminderId);

    return;
  },
  render: function() {
    console.log("Inside EditReminderForm");
    var reminder = this.props.reminder;
    return (
      <form className="contentSection" onSubmit={this.handleSubmit}>
        <input type="text" placeholder={reminder.get("reminderText")} ref="reminderText" /><br />
        <input type="text" placeholder={reminder.get("dueDate")} ref="dueDate" /><br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
});
module.exports = EditReminderForm;
