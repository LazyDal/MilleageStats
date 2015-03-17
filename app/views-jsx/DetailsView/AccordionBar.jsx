var React = require('react');

var AccordionBar = React.createClass({
  handleClick: function () {
    console.log('Click');
    this.props.onBarClick();
  },
  render: function () {
    return (
      <div id="AccordionBar" onClick={this.handleClick}>
        <button>{this.props.writeup}</button>
      </div>
    );
  }
})

module.exports = AccordionBar;
