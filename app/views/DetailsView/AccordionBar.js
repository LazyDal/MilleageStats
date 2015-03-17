var React = require('react');

var AccordionBar = React.createClass({displayName: "AccordionBar",
  handleClick: function () {
    console.log('Click');
    this.props.onBarClick();
  },
  render: function () {
    return (
      React.createElement("div", {id: "AccordionBar", onClick: this.handleClick}, 
        React.createElement("button", null, this.props.writeup)
      )
    );
  }
})

module.exports = AccordionBar;
