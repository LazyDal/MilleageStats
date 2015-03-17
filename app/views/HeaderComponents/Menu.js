var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Menu = React.createClass({displayName: "Menu",
  render: function() {
    return(
      React.createElement("div", {className: "menu"}, 
        React.createElement(Link, {to: "App"}, "Dashboard"), 
        React.createElement(Link, {to: "Details"}, "Details"), 
        React.createElement(Link, {to: "Profile"}, "Profile"), 
        React.createElement(Link, {to: "Charts"}, "Charts"), 
        React.createElement(Link, {to: "Sign-out"}, "Sign-out")
      )
    );
  }
});

module.exports = Menu;
