var React = require('react');
var Backbone = require('backbone');
var Router = require('react-router');
var $=require('jquery');
require('jquery-ui');

// TODO: send request to the server
// this.props.handleEditCar(new Car({brand: brand, model:model, name:name, kmTraveled:odometer, litresSpent:litres}));

var NewReminderForm = React.createClass({
  mixins: [Router.State],
  componentDidMount: function () {
    $( this.refs.date.getDOMNode()).datepicker();
  },
  handleSubmit: function(e) {
    e.preventDefault();
    console.log("Handling New Fillup submit");
    var reminderText = this.refs.reminderText.getDOMNode().value.trim();
    var dueDate = this.refs.dueDate.getDOMNode().value.trim();

    this.props.handleNewReminder({reminderText: reminderText, dueDate:dueDate }, this.getParams().CarId);

    return;
  },
  componentDidMount: function () {
   $( this.refs.dueDate.getDOMNode()).datepicker();
  },
  render: function() {
    console.log("Inside NewReminderForm");
    return (
      <form className="contentSection" role="form" onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label className="display-label">Reminder Text</label>
          <input className="form-control" type="text" placeholder="reminder text" ref="reminderText" /><br />
          <label className="display-label">Due Date</label>
          <input className="form-control" type="text" placeholder="day-month-year" ref="dueDate" /><br />
          <input type="submit" className="btn btn-default submitButton" value="Submit" />
        </div>
      </form>
    );
  }
});
module.exports = NewReminderForm;
