var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Menu = React.createClass({
  render: function() {
    return(
      <div className="menu">
        <Link to="App">Dashboard</Link>
        <Link to="Details">Details</Link>
        <Link to="Profile">Profile</Link>
        <Link to="Charts">Charts</Link>
        <Link to="Sign-out">Sign-out</Link>
      </div>
    );
  }
});

module.exports = Menu;
