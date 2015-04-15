var React = require('react');
var Backbone = require('backbone');

var Car = require('models/car');

// TODO: send request to the server

var NewCarForm = React.createClass({displayName: "NewCarForm",
  handleSubmit: function(e) {
    e.preventDefault();
    var brand = this.refs.brand.getDOMNode().value.trim();
    var model = this.refs.model.getDOMNode().value.trim();
    var name = this.refs.name.getDOMNode().value.trim();
    var odometer = this.refs.odometer.getDOMNode().value.trim();
    var litres = this.refs.litres.getDOMNode().value.trim();

    this.refs.brand.getDOMNode().value = '';
    this.refs.model.getDOMNode().value = '';
    this.refs.name.getDOMNode().value = '';
    this.refs.odometer.getDOMNode().value = '';
    this.refs.litres.getDOMNode().value = '';

    this.props.handleNewCar(new Car({brand: brand, model:model, name:name, kmTraveled:odometer, litresSpent:litres}));

    return;
  },
  render: function() {
    console.log("Inside NewCarForm");
    return (
      React.createElement("form", {className: "contentSection", onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "text", placeholder: "Car Brand", ref: "brand"}), 
        React.createElement("input", {type: "text", placeholder: "Car Model", ref: "model"}), 
        React.createElement("input", {type: "text", placeholder: "Car Name", ref: "name"}), 
        React.createElement("input", {type: "text", placeholder: "Odometer", ref: "odometer"}), 
        React.createElement("input", {type: "text", placeholder: "Litres", ref: "litres"}), 
        React.createElement("input", {type: "submit", value: "Post"})
      )
    );
  }
});
module.exports = NewCarForm;
