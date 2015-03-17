var React = require('react');
var SelectedLayout = require('views/HeaderComponents/SelectedLayout');
var Status = require('views/HeaderComponents/Status');
var Menu = require('views/HeaderComponents/Menu');

var HeaderComponent = React.createClass({
  render: function() {
    return(
      <header>
        <SelectedLayout />
        <Status />
        <Menu />
      </header>
    );
  }
});
module.exports = HeaderComponent;
