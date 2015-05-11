var React = require('react');
var Backbone = require('backbone');
var Router = require('react-router');
var Car = require('models/car');

// TODO: send request to the server

var EditCarForm = React.createClass({
  mixins: [Router.State],
  handleSubmit: function(e) {
    e.preventDefault();
    var brand = this.refs.brand.getDOMNode().value.trim();
    var model = this.refs.model.getDOMNode().value.trim();
    var year = this.refs.year.getDOMNode().value.trim();
    var name = this.refs.name.getDOMNode().value.trim();
    var odometer = this.refs.odometer.getDOMNode().value.trim();
    var litres = this.refs.litres.getDOMNode().value.trim();

    var theCar = this.props.data;
    if (brand=="") brand = theCar.get('brand');
    if (model=="") model = theCar.get('model');
    if (year=="") year = theCar.get('year');
    if (name=="") name = theCar.get('name');
    if (odometer=="") odometer = theCar.get('kmTraveled');
    if (litres=="") litres=theCar.get('litresSpent');

    this.props.handleEditCar({brand: brand, model:model, year: year, name:name, kmTraveled:odometer, litresSpent:litres}, this.getParams().CarId);

    return;
  },
  render: function() {
    var theCar = this.props.data;
    return (
      <form className="contentSection" onSubmit={this.handleSubmit}>
        <input type="text" placeholder={theCar.get('brand')} ref="brand" /><br />
        <input type="text" placeholder={theCar.get('model')} ref="model" /><br />
        <input type="text" placeholder={theCar.get('year')} ref="year" /><br />
        <input type="text" placeholder={theCar.get('name')} ref="name" /><br />
        <input type="text" placeholder={theCar.get('kmTraveled')} ref="odometer" /><br />
        <input type="text" placeholder={theCar.get('litresSpent')} ref="litres" /><br />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
module.exports = EditCarForm;
