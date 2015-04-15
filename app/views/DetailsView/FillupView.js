var React = require('react');
var Backbone = require('backbone');

var FillupView = React.createClass({displayName: "FillupView",
  handleClick: function () {
    console.log('FillupId from FillupView: ' + this.props.fillup._id);
    this.props.onFillupClick(this.props.fillup._id);
  },
  render: function () {
    classname = this.props.sel + " fillup"
    return (
      React.createElement("div", {onClick: this.handleClick, className: classname}, 
        React.createElement("h4", null, this.props.fillup.fillingStation), 
        React.createElement("h4", null, this.props.fillup.totalCost)
      )
    );
  }
});

module.exports = FillupView;
