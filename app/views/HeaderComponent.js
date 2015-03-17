var React = require('react');
var SelectedLayout = require('views/HeaderComponents/SelectedLayout');
var Status = require('views/HeaderComponents/Status');
var Menu = require('views/HeaderComponents/Menu');

var HeaderComponent = React.createClass({displayName: "HeaderComponent",
  render: function() {
    return(
      React.createElement("header", null, 
        React.createElement(SelectedLayout, null), 
        React.createElement(Status, null), 
        React.createElement(Menu, null)
      )
    );
  }
});
module.exports = HeaderComponent;
