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
        <CarCard data={carCard} selectedId={65000} detailsClicked={that.props.detailsClicked} fillupsClicked={that.props.fillupsClicked} remindersClicked={that.props.remindersClicked} />
      );
    });
    return(
      <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9">
        {carCards}
        <div className="vehicle newVehicle HScrollEntry" onClick={this.handleClick}>
          <div className="glass">
          </div>
          <div className="overlay">
          </div>
          <div className="addVehicle">
            <p>+ Add Vehicle</p>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = CarsPane;
