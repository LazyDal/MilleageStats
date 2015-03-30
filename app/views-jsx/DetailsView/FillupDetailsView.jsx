var React = require('react');
var Backbone = require('backbone');
var Fillups = require('collections/fillups')
var Fillup = require('models/fillup')

var FillupDetailsView = React.createClass({
  render: function () {
    d = new Date(this.props.data.date);
    date = d.toDateString() + ' ' + d.toTimeString();
    return (
      <div>
        <p>totalCost</p>
        <h4>{this.props.data.totalCost}</h4>
        <p>Total Liters</p>
        <h4>{this.props.data.totalLiters}</h4>
        <p>Filling Station</p>
        <h4>{this.props.data.fillingStation}</h4>
        <p>Odometer</p>
        <h4>{this.props.data.odometer}</h4>
        <p>Date</p>
        <h4>{date}</h4>
      </div>
    );
  }
});

module.exports = FillupDetailsView;
