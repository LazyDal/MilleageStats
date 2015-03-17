var React = require('react');

var UserRegistration = React.createClass({displayName: "UserRegistration",
  render: function() {
    return(
      React.createElement("form", null, 
        React.createElement("input", {type: "text", placeholder: "Sample User"}), 
        React.createElement("input", {type: "text", placeholder: "Country or Area"}), 
        React.createElement("input", {type: "text", placeholder: "Postal Code"})
      )
    );
  }
});

module.exports = UserRegistration;
