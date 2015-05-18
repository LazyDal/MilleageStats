var React = require('react');
var Backbone = require('backbone');
var Router = require('react-router');
var $=require('jquery');
require('jquery-ui');

// TODO: send request to the server
// this.props.handleEditCar(new Car({brand: brand, model:model, name:name, kmTraveled:odometer, litresSpent:litres}));

var NewFillupForm = React.createClass({
  mixins: [Router.State, Router.Navigation],
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
      <form className="contentSection display" role="form" onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label className="display-label">Total Cost</label>
          <input className="form-control"  type="text" placeholder="euros" ref="totalCost" /><br />
          <label className="display-label">Total Liters</label>
          <input className="form-control" type="text" placeholder="liters" ref="totalLiters" /><br />
          <label className="display-label">Filling Station</label>
          <input className="form-control" type="text" placeholder="filling station name" ref="fillingStation" /><br />
          <label className="display-label">Odometer</label>
          <input className="form-control" type="text" placeholder="kilometers" ref="odometer" /><br />
          <label className="display-label">Date</label>
          <input className="form-control" type="text" placeholder="day-month-year" ref="date" /><br />
          <input type="submit" className="btn btn-default" value="Submit" />
        </div>
      </form>
    );
  }
});
module.exports = NewFillupForm;
