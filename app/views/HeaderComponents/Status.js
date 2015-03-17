var React = require('react');

var Status = React.createClass({displayName: "Status",
  render: function() {
    return(
      React.createElement("div", {className: "status"}, 
        React.createElement("p", null, "Status, welcome sample user")
      )
    );
  }
});

module.exports = Status;
