var React = require('react');
var Navigation = require('react-router').Navigation;
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var CarStats = require('views/CarStats.jsx');
var Fillups = require('views/DetailsView/FillupsView.jsx');
var Reminders = require('views/DetailsView/Reminders.jsx');

// <div id="fillups_view"><Fillups /></div>

/************************/
/* data, remindersData  */
/* from CarDetailsPane  */
/************************/

var CarDetailsTab = React.createClass({
  render: function() {
    console.log('Inside CarDetails:');
    var reminders = this.props.data.get('reminders').filter(function(reminder) {
      if (reminder.dueDate < Date.now()) {
        return  reminder;
      }
    });
    return(
      <div>
        <div className="vehicleStatistics">
          <p className="statistics-header">Last 12 Months</p>
          <p className="statistics-label">Average Fuel Efficiency</p>
          <h1>D3 VISUALIZATION</h1>
          <p className="statistics-label">Total Distance Travelled</p>
          <h1>D3 VISUALIZATION</h1>
          <p className="statistics-label">Total Cost</p>
          <h1>D3 visualisation</h1>
        </div>
        <div className="vehicleData">
          <RouteHandler data={this.props.data} handleEditCar={this.props.handleEditCar} handleDeleteCar={this.props.handleDeleteCar} />
          <div>
            <Reminders reminders = {reminders} addReminderButton={false} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CarDetailsTab;
