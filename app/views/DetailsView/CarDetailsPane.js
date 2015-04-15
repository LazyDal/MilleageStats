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
      React.createElement("div", null, 
        React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.editClicked}, "Edit"), 
        React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.deleteClicked}, "Delete"), 
        React.createElement("div", {className: "col-xs-12 col-sm-12 col-md-12 col-lg-6"}, React.createElement("h1", null, "D3 VISUALIZATION"), React.createElement("h1", null, "D3 VISUALIZATION"), React.createElement("h1", null, "D3 visualisation")), 
        React.createElement("div", {className: "col-xs-12 col-sm-12 col-md-12 col-lg-6"}, 
          React.createElement(CarStats, {data: this.props.data}), 
          React.createElement("div", {id: "reminders_view"}, 
            React.createElement(Reminders, {reminders: this.props.data.get('reminders')})
          )
        )
      )
    );
  }
});

module.exports = CarDetailsPane;
