var React = require('react');
var Router = require('react-router');
var Backbone = require('backbone');
var $=require('jquery');
require('jquery-ui');

var Car = require('models/car');

// TODO: send request to the server

var EditFillupForm = React.createClass({
  mixins: [Router.State],
  componentDidMount: function () {
    $( this.refs.date.getDOMNode()).datepicker();
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var totalCost = this.refs.totalCost.getDOMNode().value.trim();
    var totalLiters = this.refs.totalLiters.getDOMNode().value.trim();
    var fillingStation = this.refs.fillingStation.getDOMNode().value.trim();
    var odometer = this.refs.odometer.getDOMNode().value.trim();
    var date = this.refs.date.getDOMNode().value.trim();
    var CarId = this.getParams().CarId;
    var _id = this.getParams().FillupId;

   var fillup = this.props.fillup;
   if (totalCost=="") totalCost=fillup.get('totalCost');
   if (totalLiters=="") totalLiters=fillup.get('totalLiters');
   if (fillingStation=="") fillingStation=fillup.get('fillingStation');
   if (odometer=="") odometer = fillup.get('odometer');
   if (date=="") date = fillup.get('date');
   
    this.props.handleEditFillup({totalCost:totalCost, totalLiters:totalLiters, fillingStation:fillingStation, odometer:odometer, date:date, _id:_id}, this.getParams().CarId,  this.getParams().FillupId);

  },
  render: function() {
    var fillup = this.props.fillup;
    var componentStyle = {
        width: '270px',
        oveflow: 'hide'
    };
    return (
      <form className="contentSection display" role="form" onSubmit={this.handleSubmit} style={componentStyle}>
        <div class="form-group">
          <label className="display-label">Total Cost</label>
          <input className="form-control" type="text" placeholder={fillup.get('totalCost')} ref="totalCost" /><br />
          <label className="display-label">Total Liters</label>
          <input className="form-control" type="text" placeholder={fillup.get('totalLiters')} ref="totalLiters" /><br />
          <label className="display-label">Filling Station</label>
          <input className="form-control" type="text" placeholder={fillup.get('fillingStation')} ref="fillingStation" /><br />
          <label className="display-label">Odometer</label>
          <input className="form-control" type="text" placeholder={fillup.get('odometer')} ref="odometer" /><br />
          <label className="display-label">Date</label>
          <input type="text" placeholder={fillup.get('date').toLocaleDateString()} ref="date" /><br />
          <input type="submit" className="btn btn-default submitButton" value="Submit" />
        </div>
      </form>
    );
  }
});
module.exports = EditFillupForm;
