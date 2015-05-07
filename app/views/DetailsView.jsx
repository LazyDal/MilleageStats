var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Cars = require('collections/cars');

var CarsBox = require('views/CarsBox.jsx');
var CarDetailsPane = require('views/DetailsView/CarDetailsTab.jsx');
var AccordionWidget = require('views/DetailsView/AccordionWidget.jsx');

/***************************************/
/* carData, remindersData, fillupsData */
/* sent by app.jsx                     */
/***************************************/


// <div className = "contentSection">
//   <CarsBox data={this.state.cars} selectedId={this.state.CarId} />
// </div>


var DetailsView = React.createClass({
  mixins: [Router.State],
  getInitialState: function () {
    return ({CarId: this.getParams().CarId});
  },
  render: function() {
    console.log('inside Details render');
    return(
      <div className = "contentSection">
        <CarsBox data={this.props.carsData} selectedId={this.state.CarId} setTab={this.setTab} />
        <RouteHandler carsData={this.props.carsData} handleEditCar={this.props.handleEditCar} handleDeleteCar={this.props.handleDeleteCar} handleNewFillup={this.props.handleNewFillup} handleEditFillup={this.props.handleEditFillup} handleDeleteFillup={this.props.handleDeleteFillup} handleNewReminder={this.props.handleNewReminder} handleEditReminder={this.props.handleEditReminder} handleDeleteReminder={this.props.handleDeleteReminder} />
      </div>
    );
  }
});

module.exports = DetailsView;
