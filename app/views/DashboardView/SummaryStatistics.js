var React = require('react');

var SummaryStatistics = React.createClass({displayName: "SummaryStatistics",
  render: function() {
    return(
      React.createElement("div", null, 
        React.createElement("p", null, "20 mpg"), 
        React.createElement("p", null, "19c per mile"), 
        React.createElement("p", null, "$229 per month")
      )
    );
  }
});

module.exports = SummaryStatistics;
