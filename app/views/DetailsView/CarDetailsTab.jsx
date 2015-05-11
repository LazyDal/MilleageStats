var React = require('react');
var Navigation = require('react-router').Navigation;
var Router = require('react-router');
var CarStats = require('views/CarStats.jsx');
var Fillups = require('views/DetailsView/FillupsView.jsx');
var Reminders = require('views/DetailsView/Reminders.jsx');

// <div id="fillups_view"><Fillups /></div>

/************************/
/* data, remindersData  */
/* from CarDetailsPane  */
/************************/

var CarDetailsTab = React.createClass({
  mixins: [Navigation, Router.State],
  editClicked: function () {
    this.transitionTo('/Details/' + this.getParams().CarId + '/EditCar');
  },
  deleteClicked: function () {
    this.props.handleDeleteCar(this.getParams().CarId);
  },
  render: function() {
    console.log('Inside CarDetails:');
    return(
      <div>
        <button type="button" className="btn btn-default" onClick={this.editClicked}>Edit</button>
        <button type="button" className="btn btn-default" onClick={this.deleteClicked}>Delete</button>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6"><h1>D3 VISUALIZATION</h1><h1>D3 VISUALIZATION</h1><h1>D3 visualisation</h1></div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
          <CarStats data={this.props.data} />
          <div id="reminders_view">
            Here goes all due reminders
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CarDetailsTab;
