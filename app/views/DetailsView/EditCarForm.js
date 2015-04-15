var React = require('react');
var Backbone = require('backbone');

var Car = require('models/car');

// TODO: send request to the server
// this.props.handleEditCar(new Car({brand: brand, model:model, name:name, kmTraveled:odometer, litresSpent:litres}));

var EditCarForm = React.createClass({displayName: "EditCarForm",
  handleSubmit: function(e) {
    e.preventDefault();
    console.log("Handling Edit submit");
    var brand = this.refs.brand.getDOMNode().value.trim();
    var model = this.refs.model.getDOMNode().value.trim();
    var name = this.refs.name.getDOMNode().value.trim();
    var odometer = this.refs.odometer.getDOMNode().value.trim();
    var litres = this.refs.litres.getDOMNode().value.trim();

    this.props.handleEditCar({brand: brand, model:model, name:name, odometer: odometer, litres:litres}, this.props.selectedCar);

    this.refs.brand.getDOMNode().value = '';
    this.refs.model.getDOMNode().value = '';
    this.refs.name.getDOMNode().value = '';
    this.refs.odometer.getDOMNode().value = '';
    this.refs.litres.getDOMNode().value = '';

    return;
  },
  render: function() {
    console.log("Inside EditCarForm");
    var car = this.props.carsData.get(this.props.selectedCar);
    return (
      React.createElement("form", {className: "contentSection", onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "text", placeholder: car.get("brand"), ref: "brand"}), 
        React.createElement("input", {type: "text", placeholder: car.get("model"), ref: "model"}), 
        React.createElement("input", {type: "text", placeholder: car.get("name"), ref: "name"}), 
        React.createElement("input", {type: "text", placeholder: car.get("kmTraveled"), ref: "odometer"}), 
        React.createElement("input", {type: "text", placeholder: car.get("litresSpent"), ref: "litres"}), 
        React.createElement("input", {type: "submit", value: "Post"})
      )
    );
  }
});
module.exports = EditCarForm;
