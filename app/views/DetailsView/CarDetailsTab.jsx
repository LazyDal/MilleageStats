var React = require('react');
var Navigation = require('react-router').Navigation;
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var LineChart = require('react-d3/linechart').LineChart;

var CarStats = require('views/CarStats.jsx');
var Fillups = require('views/DetailsView/FillupsView.jsx');

// <div id="fillups_view"><Fillups /></div>

/************************/
/* data, remindersData  */
/* from CarDetailsPane  */
/************************/

var CarDetailsTab = React.createClass({
  render: function() {
    console.log('Inside CarDetails:');
    
    var fillups = this.props.data.get('fillups');
    if (fillups.length > 0 ) {
      var oldDistance = this.props.data.get('kmTraveled');
      var averageFuelEfficiency = fillups.map(function(fillup) {
        var distance = fillup.odometer - oldDistance;
        oldDistance = fillup.odometer;
        return {x: fillup.date, y: distance/fillup.totalLiters}
      });
      var lineData = [
      {
        name: "series1",
        values: averageFuelEfficiency
      }];
      var totalDistanceTravelled = fillups.map(function(fillup){
        var distance = fillup.odometer - oldDistance;
        oldDistance = fillup.odometer;
        return {x: fillup.date, y: distance}
      });
      var lineData2 = [
      {
        name: "series2",
        values: totalDistanceTravelled
      }];
      var totalCost = fillups.map(function(fillup){
        return  {x: fillup.date, y: fillup.totalCost}
      });
      var lineData3 = [
      {
        name: "series3",
        values: totalCost
      }];
      var graphs = (
        <div>
          <div className="chart">
            <LineChart  data={lineData}  width={290}  height={130}  title="Average Fuel Efficiency" />
          </div>
          <div className="chart">
            <LineChart data={lineData2}  width={290}  height={130}  title="Total Distance Travelled" />
          </div>
          <div className="chart">
            <LineChart  data={lineData3}  width={290}  height={130}  title="Total Cost" />
          </div>
        </div>);
    }
    else
      graphs = <p>Nothing to show</p>
    return(
      <div>
        <div className="vehicleStatistics">
          <p className="statistics-header">Last 12 Months</p>
          {graphs}
        </div>
        <div className="vehicleData">
          <RouteHandler data={this.props.data} handleEditCar={this.props.handleEditCar} handleDeleteCar={this.props.handleDeleteCar} />
          <div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CarDetailsTab;
