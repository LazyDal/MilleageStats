var React = require('react');
var Backbone = require('backbone');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Cars = require('collections/cars');

var CarsBox = require('views/CarsBox');
var CarDetailsPane = require('views/DetailsView/CarDetailsPane');
var AccordionWidget = require('views/DetailsView/AccordionWidget');

/***************************************/
/* carData, remindersData, fillupsData */
/* sent by app.jsx                     */
/***************************************/


// <div className = "contentSection">
//   <CarsBox data={this.state.cars} selectedId={this.state.CarId} />
// </div>


var DetailsView = React.createClass({displayName: "DetailsView",
  mixins: [Router.State],
  getInitialState: function () {
    return ({CarId: this.getParams().CarId});
  },
  componentWillReceiveProps: function () {
    this.setState({CarId: this.getParams().CarId});
  },
  handleEditCar: function (parameters, selectedCar) {
    var car = this.props.carsData.get(selectedCar);
    console.log("parameters:" + parameters.name);
    car.set({name: parameters.name, brand:parameters.brand, model:parameters.model, kmTraveled:parameters.odometer, litresSpent:parameters.litres});
    this.setState({CarId: this.getParams().CarId});
  },
  render: function() {
    console.log('inside Details render');
    return(
      React.createElement("div", {className: "contentSection"}, 
        React.createElement(CarsBox, {data: this.props.carsData, selectedId: this.state.CarId}), 
        React.createElement(RouteHandler, {carsData: this.props.carsData, selectedCar: this.state.CarId, handleEditCar: this.handleEditCar})
      )
    );
  }
});

module.exports = DetailsView;
