var React = require('react');
var Backbone = require('backbone');

var Car = require('models/car');

// TODO: send request to the server

var NewCarForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var brand = this.refs.brand.getDOMNode().value.trim();
    var model = this.refs.model.getDOMNode().value.trim();
    var year = this.refs.year.getDOMNode().value.trim();
    var name = this.refs.name.getDOMNode().value.trim();
    var odometer = this.refs.odometer.getDOMNode().value.trim();
    var litres = this.refs.litres.getDOMNode().value.trim();

    this.refs.brand.getDOMNode().value = '';
    this.refs.model.getDOMNode().value = '';
    this.refs.year.getDOMNode().value = '';
    this.refs.name.getDOMNode().value = '';
    this.refs.odometer.getDOMNode().value = '';
    this.refs.litres.getDOMNode().value = '';

    this.props.handleNewCar(new Car({brand: brand, model:model, year: year, name:name, kmTraveled:odometer, litresSpent:litres}));

    return;
  },
  render: function() {
    console.log("Inside NewCarForm");
    return (
      <form className="contentSection" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Car Brand" ref="brand" /><br />
        <input type="text" placeholder="Car Model" ref="model" /><br />
        <input type="text" placeholder="Car Year" ref="year" /><br />
        <input type="text" placeholder="Car Name" ref="name" /><br />
        <input type="text" placeholder="Odometer" ref="odometer" /><br />
        <input type="text" placeholder="Litres" ref="litres" /><br />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
module.exports = NewCarForm;
