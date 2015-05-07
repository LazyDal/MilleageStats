var React = require('react');
var Backbone = require("backbone");
// require('jquery');
// var Router = require('react-router');

var CarCard = require('views/CarCard.jsx');
require('collections/cars');
require('models/car');

// $('.CarsBox').addClass('animated wobble');
/********************/
/* data, selectedId */
/* from DetailsView */
/********************/

var CarsBox = React.createClass({
  render: function() {
    that = this;
    console.log('Inside CarsBox render');
    var carCards = that.props.data.map(function (carCard) {
      return(
        <CarCard data={carCard} selectedId={that.props.selectedId} />
      );
    });
    return(
      <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 CarsBox smHScrollLgVScroll">
        {carCards}
      </div>
    );
  }
});

module.exports = CarsBox;
