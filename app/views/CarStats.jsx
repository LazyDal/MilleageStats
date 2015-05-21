var React = require('react');
var Router = require('react-router');
var Reminders = require('views/DetailsView/Reminders.jsx');

var CarStats = React.createClass({
    mixins: [Router.State, Router.Navigation],
   editClicked: function () {
    this.transitionTo('/Details/' + this.getParams().CarId + '/EditCar');
  },
  deleteClicked: function () {
    this.props.handleDeleteCar(this.getParams().CarId);
  },
  render: function() {
    console.log('inside CarStats');
    var data = this.props.data;
    var reminders = this.props.data.get('reminders').filter(function(reminder) {
      if (reminder.dueDate < Date.now()) {
        return  reminder;
      }
    });
    return(
      <div className="display">
        <button type="button" className="btn btn-default" onClick={this.editClicked}>Edit</button>
        <button type="button" className="btn btn-default" onClick={this.deleteClicked}>Delete</button>
        <p className="display-label">Vehicle Name</p>
        <p className="display-field">{data.get('name')}</p>
        <p className="display-label">Model Year</p>
        <p className="display-field">{data.get('year')}</p>
        <p className="display-label">Brand</p>
        <p className="display-field">{data.get('brand')}</p>
        <p className="display-label">Model</p>
        <p className="display-field">{data.get('model')}</p>
        <p className="display-label">Odometer</p>
        <p className="display-field">{data.get('kmTraveled')} kilometers</p>
        <Reminders reminders = {reminders} className="carTabReminders" addReminderButton={false} />
      </div>
    );
  }
});

module.exports = CarStats;
