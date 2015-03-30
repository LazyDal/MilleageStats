var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Reminder = require('models/reminder');
var Reminders = require('collections/reminders');

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

var AccordionWidget = React.createClass({displayName: "AccordionWidget",
  componentWillReceiveProps: function () {
    this.forceUpdate();
  },
  handleClickOn1: function () {
    console.log('handleClickOn1');
    location.hash = "/Details/" + this.props.selectedCar;
  },
  handleClickOn2: function () {
    console.log('handleClickOn2');
    location.hash = "/Details/" + this.props.selectedCar + "/Fillups";
  },
  handleClickOn3: function () {
    console.log('handleClickOn3');
    location.hash = "/Details/" + this.props.selectedCar + "/Reminders";
  },
  render: function () {
    console.log('inside AccordionWidget');
    var theCar = this.props.carsData.findWhere({_id: this.props.selectedCar});
    var InnerNodes = [];
    InnerNodes.push(React.createElement(AccordionBar, {writeup: React.createElement("p", null, "Details"), className: "accordionWidgetDetails", onBarClick: this.handleClickOn1}));
    if (location.href.indexOf('Fillups') > 0) {
      InnerNodes.push(React.createElement(AccordionBar, {writeup: React.createElement("p", null, "Fillups"), className: "accordionWidgetFillups", onBarClick: this.handleClickOn2}));
      console.log('Calling FillupsView');
      console.log(theCar);
      InnerNodes.push(React.createElement(FillupsView, {data: theCar.get('fillups'), selectedCar: this.props.selectedCar}));
      InnerNodes.push(React.createElement(AccordionBar, {writeup: React.createElement("p", null, "Reminders"), className: "accordionWidgetReminders", onBarClick: this.handleClickOn3}));
    }
    else if (location.href.indexOf('Reminders') > 0) {
      InnerNodes.push(React.createElement(AccordionBar, {writeup: React.createElement("p", null, "Fillups"), className: "accordionWidgetFillups", onBarClick: this.handleClickOn2}));
      InnerNodes.push(React.createElement(AccordionBar, {writeup: React.createElement("p", null, "Reminders"), className: "accordionWidgetReminders", onBarClick: this.handleClickOn3}));
      console.log(this.props.selectedCar);
      console.log(theCar);
      console.log('remindersData:' + theCar.get('reminders'));
      InnerNodes.push(React.createElement(Reminders, {data: theCar.get('reminders')}));

    }
    else {
      var carName = this.props.carsData.get('name');
      console.log('Car name from accordion:' + carName);
      InnerNodes.push("<p>CarDetailsPane</p>");
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
