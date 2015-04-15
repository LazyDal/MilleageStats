var React = require('react');
var Backbone = require('backbone');

var Car = require('models/car');

// TODO: send request to the server

var NewCarForm = React.createClass({
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
      <form className="contentSection" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Car Brand" ref="brand" />
        <input type="text" placeholder="Car Model" ref="model" />
        <input type="text" placeholder="Car Name" ref="name" />
        <input type="text" placeholder="Odometer" ref="odometer" />
        <input type="text" placeholder="Litres" ref="litres" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
module.exports = NewCarForm;
