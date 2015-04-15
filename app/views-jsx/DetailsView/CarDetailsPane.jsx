var React = require('react');

var CarStats = require('views/CarStats');
var Fillups = require('views/DetailsView/FillupsView');
var Reminders = require('views/DetailsView/Reminders');

// <div id="fillups_view"><Fillups /></div>

/************************/
/* data, remindersData  */
/* from CarDetailsPane  */
/************************/

var CarDetailsPane = React.createClass({
  editClicked: function () {
    location.hash += "/EditCar";
  },
  deleteClicked: function () {
    location.hash += "/DeleteCar";
  },
  render: function() {
    console.log('Inside CarDetals:');
    var carName = this.props.data.get('name');
    console.log(this.props.remindersData);
    return(
      <div>
        <button type="button" className="btn btn-default" onClick={this.editClicked}>Edit</button>
        <button type="button" className="btn btn-default" onClick={this.deleteClicked}>Delete</button>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6"><h1>D3 VISUALIZATION</h1><h1>D3 VISUALIZATION</h1><h1>D3 visualisation</h1></div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
          <CarStats data={this.props.data} />
          <div id="reminders_view">
            <Reminders reminders={this.props.data.get('reminders')} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CarDetailsPane;
