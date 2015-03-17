var React = require('react');
var Backbone = require('backbone');

var CarCard = require('views/CarCard');

var CarsPane = React.createClass({displayName: "CarsPane",
  render: function() {
    that = this;
    console.log('Inside CarsPane render');
    var carCards = that.props.data.map(function (carCard) {
      return(
        React.createElement(CarCard, {data: carCard, selectedId: 65000})
      );
    });
    return(
      React.createElement("div", {className: "col-xs-12 col-sm-9 col-md-9 col-lg-9"}, 
        React.createElement("p", null, "CarCards"), 
        carCards
      )
    );
  }
});
module.exports = CarsPane;
