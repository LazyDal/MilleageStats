var React = require('react');
var Backbone = require('backbone');
var Fillups = require('collections/fillups')
var Fillup = require('models/fillup')

var FillupDetailsView = React.createClass({displayName: "FillupDetailsView",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("p", null, "totalCost"), 
        React.createElement("h4", null, this.props.data.totalCost), 
        React.createElement("p", null, "Total Liters"), 
        React.createElement("h4", null, this.props.data.totalLiters), 
        React.createElement("p", null, "Filling Station"), 
        React.createElement("h4", null, this.props.data.fillingStation), 
        React.createElement("p", null, "Odometer"), 
        React.createElement("h4", null, this.props.data.odometer)
      )
    );
  }
});

module.exports = FillupDetailsView;
