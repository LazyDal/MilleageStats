var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Menu = React.createClass({
  render: function() {
    return(
      <div className="menu">
        <div className="nav">
          <Link to="Sign-out">Sign-out ]</Link>
        </div>
        <div className="nav">
          <Link to="Charts">Charts |</Link>
        </div>
        <div className="nav">
          <Link to="Profile">Profile |</Link>
        </div>
        <div className="nav">
          <Link to="Details">Details |</Link>
        </div>
        <div className="nav">
          <Link to="Dashboard">[ Dashboard |</Link>
        </div>

      </div>
    );
  }
});

module.exports = Menu;
