var React = require('react');
var Backbone = require("backbone");
// require('jquery');
// var Router = require('react-router');

var CarCard = require('views/CarCard');
require('collections/cars');
require('models/car');

// $('.CarsBox').addClass('animated wobble');
/********************/
/* data, selectedId */
/* from DetailsView */
/********************/

var CarsBox = React.createClass({displayName: "CarsBox",
  render: function() {
    that = this;
    console.log('Inside CarsBox render');
    var carCards = that.props.data.map(function (carCard) {
      return(
        React.createElement(CarCard, {data: carCard, selectedId: that.props.selectedId})
      );
    });
    return(
      React.createElement("div", {className: "col-xs-12 col-sm-2 col-md-2 col-lg-2 CarsBox smHScrollLgVScroll"}, 
        carCards
      )
    );
  }
});

module.exports = CarsBox;
