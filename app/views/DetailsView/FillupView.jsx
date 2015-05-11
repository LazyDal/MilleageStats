var React = require('react');
var Backbone = require('backbone');

var FillupView = React.createClass({
  handleClick: function (e) {
    console.log('FillupId from FillupView: ' + this.props.fillup.get('_id'));
    this.props.onFillupClick(e, this.props.fillup.get('_id'));
  },
  render: function () {
     console.log('Rendering a fillup');
     var componentStyle = {
      backgroundColor: 'yellow',
      width: '270px',
      oveflow: 'hide'
    };
    return (<div onClick={this.handleClick} style={componentStyle} className={this.props.sel}>
      <h4>{this.props.fillup.get('fillingStation')}</h4>
      <h4>{this.props.fillup.get('totalCost')}</h4>
    </div>);
  }
});

module.exports = FillupView;
