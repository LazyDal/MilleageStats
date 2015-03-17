var React = require('react');
var Backbone = require('backbone');
var Fillups = require('collections/fillups')
var Fillup = require('models/fillup')

var FillupView = React.createClass({displayName: "FillupView",
  handleClick: function () {
    console.log('FillupId from FillupView: ' + this.props.data._id);
    this.props.onFillupClick(this.props.data._id);
  },
  render: function () {
    classname = this.props.sel + " fillup"
    return (
      React.createElement("div", {onClick: this.handleClick, className: classname}, 
        React.createElement("h4", null, this.props.data.fillingStation), 
        React.createElement("h4", null, this.props.data.totalCost)
      )
    );
  }
});

module.exports = FillupView;
