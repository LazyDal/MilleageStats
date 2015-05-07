var React = require('react');
var Backbone = require('backbone');

var ReminderView = React.createClass({
  handleClick: function () {
    console.log('ReminderId from ReminderView: ' + this.props.reminder.get('_id'));
    this.props.onReminderClick(this.props.reminder.get('_id'));
  },
  handleDeleteClick: function () {
    this.props.handleDeleteClick();
  },
  handleEditClick: function () {
    this.props.handleEditClick();
  },
  render: function () {
    d = new Date(this.props.reminder.get('dueDate'));
    date = d.toDateString() + ' ' + d.toTimeString();
    var buttons = [];
    if (this.props.sel != "") {
      buttons.push(<div>
                              <button type="button" className="btn btn-default" onClick={this.handleEditClick}>Edit</button>
                              <button type="button" className="btn btn-default" onClick={this.handleDeleteClick}>Delete</button>
                            </div>);
    }
    classname = this.props.sel;
    return (
      <div onClick={this.handleClick} className={classname}>
         <p>{this.props.reminder.get('reminderText')}</p>
         <p>Due Date: {date}</p>
         {buttons}
      </div>
    );
  }
});

module.exports = ReminderView;
