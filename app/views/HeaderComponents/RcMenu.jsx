var React = require('react');
var Menu = require('react-menus');

var items = {
  label: "Dashboard",
  label: "Details",
  label: "Profile",
  label: "Charts",
  label: "Sign-Out"
}

var RcMenu = React.createClass({
  handleClick: function(item) {
    console.log('clicked ', item.label)
  },
  render: function () {
    return (
      <Menu items={items} onClick={this.handleClick} />
    );
  }
});
module.exports = RcMenu;
