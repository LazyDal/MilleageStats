var React = require('react');
var Backbone = require('backbone');
var Fillups = require('collections/fillups')
var Fillup = require('models/fillup')

var FillupView = React.createClass({
  handleClick: function () {
    console.log('FillupId from FillupView: ' + this.props.data._id);
    this.props.onFillupClick(this.props.data._id);
  },
  render: function () {
    classname = this.props.sel + " fillup"
    return (
      <div onClick={this.handleClick} className={classname}>
        <h4>{this.props.data.fillingStation}</h4>
        <h4>{this.props.data.totalCost}</h4>
      </div>
    );
  }
});

module.exports = FillupView;
