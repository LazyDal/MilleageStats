var Backbone = require('backbone');
var React = require('react');

var Car = require('models/car');
var Cars = require('collections/cars');

var DetailsView = require('views/DetailsView');

var cars = new Cars();

var App = React.createClass({displayName: "App",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement(DetailsView, {cars: this.props.cars})
      )
    );
  }
});

React.render(React.createElement(App, {cars: cars}), document.body);
