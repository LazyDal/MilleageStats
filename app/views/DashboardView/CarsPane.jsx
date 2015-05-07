var React = require('react');
var Backbone = require('backbone');
var Navigation = require('react-router').Navigation;
var CarCard = require('views/CarCard.jsx');

var CarsPane = React.createClass({
  mixins:[Navigation],
  handleClick: function () {
    this.replaceWith('/NewCar');
  },
  render: function() {
    console.log('Inside CarsPane render');
    that = this;
    var carCards = that.props.data.map(function (carCard) {
      return(
        <CarCard data={carCard} selectedId={65000} />
      );
    });
    return(
      <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9">
        <p>CarCards</p>
        {carCards}
        <div className="car_card HScrollEntry" onClick={this.handleClick}><p>+ New Car</p></div>
      </div>
    );
  }
});
module.exports = CarsPane;
