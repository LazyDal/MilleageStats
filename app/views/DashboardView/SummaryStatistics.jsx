var React = require('react');

var SummaryStatistics = React.createClass({
  render: function() {
    return(
      <div>
        <p>20 mpg</p>
        <p>19c per mile</p>
        <p>$229 per month</p>
      </div>
    );
  }
});

module.exports = SummaryStatistics;
