var React = require('react');

var SummaryStatistics = React.createClass({
  render: function() {
    return(
      <div className="summary-statistics">
        <p className="display-title">Summary Statistics</p>
        <div><span className="display-big-number">20</span><span className="display-dashboard-unit">kpl</span></div>
        <div><span className="display-big-number">19c</span><span className="display-dashboard-unit">per km</span></div>
       <div><span className="display-big-number">$229</span><span className="display-dashboard-unit">per month</span></div>
      </div>
    );
  }
});

module.exports = SummaryStatistics;
