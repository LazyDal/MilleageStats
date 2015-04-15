var React = require('react');
var Backbone = require('backbone');

var CarCard = require('views/CarCard');
var NewCarForm = require('views/DashboardView/NewCarForm');

var CarsPane = React.createClass({displayName: "CarsPane",
  handleClick: function () {
    location.hash = "/NewCar";
  },
  render: function() {
    console.log('Inside CarsPane render');
    that = this;
    var carCards = that.props.data.map(function (carCard) {
      return(
        React.createElement(CarCard, {data: carCard, selectedId: 65000})
      );
    });
    return(
      React.createElement("div", {className: "col-xs-12 col-sm-9 col-md-9 col-lg-9"}, 
        React.createElement("p", null, "CarCards"), 
        carCards, 
        React.createElement("div", {className: "car_card HScrollEntry", onClick: this.handleClick}, React.createElement("p", null, "+ New Car"))
      )
    );
  }
});
module.exports = CarsPane;
