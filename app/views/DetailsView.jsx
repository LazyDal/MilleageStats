var Backbone = require('backbone');
var $ = require('jquery');
var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
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

// detailsClicked: function (car) {
//     console.log('detailsClicked');
//     this.setState({SelectedView: 1});
//     this.transitionTo('/Details/' + car.get('_id'));
//   },
//   fillupsClicked: function (car) {
//     console.log('Inside fillups clicked');
//     console.log('detailsClicked');
//     this.setState({SelectedView: 2});
//     this.transitionTo('/Details/' + car.get('_id') + "/Fillups");
//   },
//   remindersClicked: function (car) {
//     this.setState({SelectedView: 3});
//     console.log('remindersClicked: ');
//     location.hash = "/Details/" + car.get('_id') + "/Reminders";
//   },


var DetailsView = React.createClass({
  mixins: [Navigation, Router.State],
  getInitialState: function () {
    return ({CarId: this.getParams().CarId, SelectedView: 0});
  },
  render: function() {
    console.log('inside Details render');
    return(
      <div className = "contentSection">
        <CarsBox data={this.props.carsData} />
        <RouteHandler  carsData={this.props.carsData} handleEditCar={this.props.handleEditCar} handleDeleteCar={this.props.handleDeleteCar} handleNewFillup={this.props.handleNewFillup} handleEditFillup={this.props.handleEditFillup} handleDeleteFillup={this.props.handleDeleteFillup} handleNewReminder={this.props.handleNewReminder} handleEditReminder={this.props.handleEditReminder} handleDeleteReminder={this.props.handleDeleteReminder} />
      </div>
    );
  }
});

module.exports = DetailsView;
