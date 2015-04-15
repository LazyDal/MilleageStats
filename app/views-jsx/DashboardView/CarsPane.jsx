var React = require('react');
var Backbone = require('backbone');

var CarCard = require('views/CarCard');
var NewCarForm = require('views/DashboardView/NewCarForm');

var CarsPane = React.createClass({
  handleClick: function () {
    location.hash = "/NewCar";
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
