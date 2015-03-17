var React = require('react');

var CarStats = require('views/CarStats');
var Fillups = require('views/DetailsView/FillupsView');
var Reminders = require('views/DetailsView/Reminders');

// <div id="fillups_view"><Fillups /></div>

/************************/
/* data, remindersData  */
/* from CarDetailsPane  */
/************************/

var CarDetailsPane = React.createClass({displayName: "CarDetailsPane",
  render: function() {
    console.log('Inside CarDetals:');
    var carName = this.props.data.get('name');
    console.log(this.props.remindersData);
    console.log('Car name from accordion widget:' + carName);
    return(
      React.createElement("div", null, 
        React.createElement("div", {className: "col-xs-12 col-sm-12 col-md-12 col-lg-6"}, React.createElement("h1", null, "D3 VISUALIZATION"), React.createElement("h1", null, "D3 VISUALIZATION"), React.createElement("h1", null, "D3 visualisation")), 
        React.createElement("div", {className: "col-xs-12 col-sm-12 col-md-12 col-lg-6"}, 
          React.createElement(CarStats, {data: this.props.data}), 
          React.createElement("div", {id: "reminders_view"}, 
            React.createElement(Reminders, {data: this.props.data.get('reminders'), remindersData: this.props.remindersData})
          )
        )
      )
    );
  }
});

module.exports = CarDetailsPane;
