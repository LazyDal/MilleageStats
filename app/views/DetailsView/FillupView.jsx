var React = require('react');
var Backbone = require('backbone');

var FillupView = React.createClass({
  handleClick: function (e) {
    console.log('FillupId from FillupView: ' + this.props.fillup.get('_id'));
    this.props.onFillupClick(e, this.props.fillup.get('_id'));
  },
  render: function () {
     console.log('Rendering a fillup');

    return (<div onClick={this.handleClick} className={"list-item " + this.props.sel}>
      <h1>{this.props.fillup.get('date').toLocaleDateString()}</h1>
      <p>{this.props.fillup.get('fillingStation')}</p>
      <p>{this.props.fillup.get('totalCost')}</p>
    </div>);
  }
});

module.exports = FillupView;
