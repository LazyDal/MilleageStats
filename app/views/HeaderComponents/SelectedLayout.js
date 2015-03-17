var React = require('react');

var SelectedLayout = React.createClass({displayName: "SelectedLayout",
  render: function() {
    return(
      React.createElement("div", {className: "selectedLayout"}, 
        React.createElement("p", null, "Selected Layout")
      )
    );
  }
});

module.exports = SelectedLayout;
