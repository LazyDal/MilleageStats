var React = require('react');
var Backbone = require('backbone');

var CarCard = require('views/CarCard');

var CarsPane = React.createClass({
  render: function() {
    that = this;
    console.log('Inside CarsPane render');
    var carCards = that.props.data.map(function (carCard) {
      return(
        <CarCard data={carCard} selectedId={65000} />
      );
    });
    return(
      <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9">
        <p>CarCards</p>
        {carCards}
      </div>
    );
  }
});
module.exports = CarsPane;
