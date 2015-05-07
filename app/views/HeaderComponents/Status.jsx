var React = require('react');

var Status = React.createClass({
  render: function() {
    return(
      <div className="status">
        <p>{this.props.status}</p>
      </div>
    );
  }
});

module.exports = Status;
