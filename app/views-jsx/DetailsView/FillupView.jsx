var React = require('react');
var Backbone = require('backbone');

var FillupView = React.createClass({
  handleClick: function () {
    console.log('FillupId from FillupView: ' + this.props.fillup._id);
    this.props.onFillupClick(this.props.fillup._id);
  },
  render: function () {
    classname = this.props.sel + " fillup"
    return (
      <div onClick={this.handleClick} className={classname}>
        <h4>{this.props.fillup.fillingStation}</h4>
        <h4>{this.props.fillup.totalCost}</h4>
      </div>
    );
  }
});

module.exports = FillupView;
