var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var AccordionBar = require('views/DetailsView/AccordionBar');
var CarDetailsPane = require('views/DetailsView/CarDetailsPane');
var Reminders = require('views/DetailsView/Reminders');
var FillupsView = require('views/DetailsView/FillupsView');

/****************************************/
/* carData, remindersData, fillupsData  */
/* from DetailsView                     */
/****************************************/

// InnerNodes.push(<RouteHandler fillupsData={this.props.fillupsData} fillupsIndexes={that.props.carData.get('fillups')}  />);
// InnerNodes.push(<CarDetailsPane data={this.props.carsData} remindersData={this.props.remindersData} className="accordionWidgetShrinked" />);

// componentWillReceiveProps: function () {
//   this.forceUpdate();
// },

// findWhere({_id:

var AccordionWidget = React.createClass({displayName: "AccordionWidget",
  getInitialState: function () {
    return({selectedTab: 1});
  },
  handleClickOn1: function () {
    console.log('handleClickOn1');
    location.hash = "/Details/" + this.props.selectedCar;
    this.setState({selectedTab: 1});
  },
  handleClickOn2: function () {
    console.log('handleClickOn2');
    location.hash = "/Details/" + this.props.selectedCar + "/Fillups";
    this.setState({selectedTab: 2})
  },
  handleClickOn3: function () {
    console.log('handleClickOn3');
    location.hash = "/Details/" + this.props.selectedCar + "/Reminders";
    this.setState({selectedTab: 3})
  },
  handleNewFillupForm: function (parameters) {
    var theCar = this.props.carsData.get(this.props.selectedCar).get('fillups').push(parameters);
    console.log(parameters);
    location.hash = "/Details/" + this.props.selectedCar + "/Fillups";
    this.forceUpdate();
  },
  render: function () {
    console.log('inside AccordionWidget');
    var theCar = this.props.carsData.get(this.props.selectedCar);
    var InnerNodes = [];
    InnerNodes.push(React.createElement(AccordionBar, {writeup: React.createElement("p", null, "Details"), className: "accordionWidgetDetails", onBarClick: this.handleClickOn1}));
    if (this.state.selectedTab == 2) {
      InnerNodes.push(React.createElement(AccordionBar, {writeup: React.createElement("p", null, "Fillups"), className: "accordionWidgetFillups", onBarClick: this.handleClickOn2}));
      console.log('Calling FillupsView');
      console.log(theCar);
      InnerNodes.push(React.createElement(RouteHandler, {fillups: theCar.get('fillups'), selectedCar: this.props.selectedCar, handleNewFillupForm: this.handleNewFillupForm}));
      InnerNodes.push(React.createElement(AccordionBar, {writeup: React.createElement("p", null, "Reminders"), className: "accordionWidgetReminders", onBarClick: this.handleClickOn3}));
    }
    else if (this.state.selectedTab == 3) {
      InnerNodes.push(React.createElement(AccordionBar, {writeup: React.createElement("p", null, "Fillups"), className: "accordionWidgetFillups", onBarClick: this.handleClickOn2}));
      InnerNodes.push(React.createElement(AccordionBar, {writeup: React.createElement("p", null, "Reminders"), className: "accordionWidgetReminders", onBarClick: this.handleClickOn3}));
      console.log(this.props.selectedCar);
      console.log(theCar);
      console.log('remindersData:' + theCar.get('reminders'));
      InnerNodes.push(React.createElement(RouteHandler, {reminders: theCar.get('reminders')}));

    }
    else {
      var carName = this.props.carsData.get('name');
      console.log('Car name from accordion:' + carName);
      InnerNodes.push(React.createElement(CarDetailsPane, {data: theCar}));
      InnerNodes.push(React.createElement(AccordionBar, {writeup: React.createElement("p", null, "Fillups"), className: "accordionWidgetFillups", onBarClick: this.handleClickOn2}));
      InnerNodes.push(React.createElement(AccordionBar, {writeup: React.createElement("p", null, "Reminders"), className: "accordionWidgetReminders", onBarClick: this.handleClickOn3}));
    }

    return (
      React.createElement("div", {className: "col-xs-12 col-sm-10 col-md-10 col-lg-10 accordionWidget"}, 
        InnerNodes
      )
    );
  }
});
module.exports = AccordionWidget;
