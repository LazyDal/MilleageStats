var React = require('react');
var Backbone = require('backbone');

var ReminderView = React.createClass({
  handleClick: function (e) {
    e.stopPropagation();
    console.log('ReminderId from ReminderView: ' + this.props.reminder.get('_id'));
    this.props.onReminderClick(this.props.reminder.get('_id'));
  },
  handleDeleteClick: function (e) {
    e.stopPropagation();
    this.props.handleDeleteClick();
  },
  handleEditClick: function (e) {
    e.stopPropagation();
    this.props.handleEditClick();
  },
  render: function () {
    var buttons = [];
    if (this.props.sel != "") {
      buttons.push(<div>
                              <button type="button" className="btn btn-default" onClick={this.handleEditClick}>Edit</button>
                              <button type="button" className="btn btn-default" onClick={this.handleDeleteClick}>Delete</button>
                            </div>);
    }
    classname = "list-item " + this.props.sel;
    if (this.props.reminder.get("dueDate") < Date.now())
      classname += ' overdue';
    return (
      <div onClick={this.handleClick} className={classname}>
         <h1>{this.props.reminder.get('reminderText')}</h1>
         <p>Due Date: {this.props.reminder.get("dueDate").toLocaleDateString()}</p>
         {buttons}
      </div>
    );
  }
});

module.exports = ReminderView;
