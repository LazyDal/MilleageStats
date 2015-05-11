var React = require('react');
var Backbone = require('backbone');
var Router = require('react-router');
var $=require('jquery');
require('jquery-ui');

// TODO: send request to the server
// this.props.handleEditCar(new Car({brand: brand, model:model, name:name, kmTraveled:odometer, litresSpent:litres}));

var NewFillupForm = React.createClass({
  componentDidMount: function () {
   $( this.refs.date.getDOMNode()).datepicker();
  },
  handleSubmit: function(e) {
    e.preventDefault();
    console.log("Handling New Fillup submit");
    var totalCost = this.refs.totalCost.getDOMNode().value.trim();
    var totalLiters = this.refs.totalLiters.getDOMNode().value.trim();
    var fillingStation = this.refs.fillingStation.getDOMNode().value.trim();
    var odometer = this.refs.odometer.getDOMNode().value.trim();
    var date = this.refs.date.getDOMNode().value.trim();

    this.props.handleNewFillup({totalCost: totalCost, totalLiters:totalLiters, fillingStation:fillingStation, odometer: odometer, date:date}, this.getParams().CarId);

    return;
  },
  render: function() {
    console.log("Inside NewFillupForm");
    return (
      <form className="contentSection" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="total cost" ref="totalCost" /><br />
        <input type="text" placeholder="total liters" ref="totalLiters" /><br />
        <input type="text" placeholder="filling station" ref="fillingStation" /><br />
        <input type="text" placeholder="odometer" ref="odometer" /><br />
        <input type="text" placeholder="year-month-day" ref="date" /><br />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
module.exports = NewFillupForm;
