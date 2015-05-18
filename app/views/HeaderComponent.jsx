var React = require('react');
var SelectedLayout = require('views/HeaderComponents/SelectedLayout.jsx');
var Status = require('views/HeaderComponents/Status.jsx');
var Menu = require('views/HeaderComponents/Menu.jsx');

var HeaderComponent = React.createClass({
  render: function() {
    return(
      <header>
        <SelectedLayout />
        <Status status={this.props.status}  refreshShow={this.props.refreshShow} fadeOut={this.props.fadeOut} />
        <Menu />
      </header>
    );
  }
});
module.exports = HeaderComponent;
