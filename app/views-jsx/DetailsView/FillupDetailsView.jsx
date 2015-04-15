var React = require('react');
var Backbone = require('backbone');

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
        <button type="button" className="btn btn-default">Edit</button>
        <button type="button" className="btn btn-default">Delete</button>
      </div>
    );
  }
});

module.exports = FillupDetailsView;
