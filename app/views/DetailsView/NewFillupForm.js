var React = require('react');
var Backbone = require('backbone');

// TODO: send request to the server
// this.props.handleEditCar(new Car({brand: brand, model:model, name:name, kmTraveled:odometer, litresSpent:litres}));

var NewFillupForm = React.createClass({displayName: "NewFillupForm",
  handleSubmit: function(e) {
    e.preventDefault();
    console.log("Handling New Fillup submit");
    var totalCost = this.refs.totalCost.getDOMNode().value.trim();
    var totalLiters = this.refs.totalLiters.getDOMNode().value.trim();
    var fillingStation = this.refs.fillingStation.getDOMNode().value.trim();
    var odometer = this.refs.odometer.getDOMNode().value.trim();
    var date = this.refs.date.getDOMNode().value.trim();

    this.props.handleNewFillupForm({totalCost: totalCost, totalLiters:totalLiters, fillingStation:fillingStation, odometer: odometer, date:date});

    this.refs.totalCost.getDOMNode().value = '';
    this.refs.totalLiters.getDOMNode().value = '';
    this.refs.fillingStation.getDOMNode().value = '';
    this.refs.odometer.getDOMNode().value = '';
    this.refs.date.getDOMNode().value = '';

    return;
  },
  render: function() {
    console.log("Inside NewFillupForm");
    return (
      React.createElement("form", {className: "contentSection", onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "text", placeholder: "totalCost", ref: "totalCost"}), 
        React.createElement("input", {type: "text", placeholder: "totalLiters", ref: "totalLiters"}), 
        React.createElement("input", {type: "text", placeholder: "fillingStation", ref: "fillingStation"}), 
        React.createElement("input", {type: "text", placeholder: "odometer", ref: "odometer"}), 
        React.createElement("input", {type: "text", placeholder: "date", ref: "date"}), 
        React.createElement("input", {type: "submit", value: "Post"})
      )
    );
  }
});
module.exports = NewFillupForm;
