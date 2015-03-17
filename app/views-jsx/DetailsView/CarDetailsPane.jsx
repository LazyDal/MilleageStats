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
  render: function() {
    console.log('Inside CarDetals:');
    var carName = this.props.data.get('name');
    console.log(this.props.remindersData);
    console.log('Car name from accordion widget:' + carName);
    return(
      <div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6"><h1>D3 VISUALIZATION</h1><h1>D3 VISUALIZATION</h1><h1>D3 visualisation</h1></div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
          <CarStats data={this.props.data} />
          <div id="reminders_view">
            <Reminders data={this.props.data.get('reminders')} remindersData={this.props.remindersData} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CarDetailsPane;
