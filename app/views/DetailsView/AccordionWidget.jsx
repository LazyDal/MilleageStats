var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = require('react-router').Navigation;
var $ = require('jquery');

var Car = require('models/car');
var AccordionBar = require('views/DetailsView/AccordionBar.jsx');
var CarDetailsPane = require('views/DetailsView/CarDetailsTab.jsx');
var Reminders = require('views/DetailsView/Reminders.jsx');
var FillupsView = require('views/DetailsView/FillupsView.jsx');

var Fillup = require('models/fillup');
var Fillups = require('collections/fillups');

/****************************************/
/* carData, remindersData, fillupsData  */
/* from DetailsView                     */
/****************************************/
var AccordionWidget = React.createClass({
  mixins: [Navigation, Router.State],
  getInitialState: function() {
    return ({tab: 'init'});
  },
  showCarStats: function() {
     this.transitionTo('/Details/' + this.getParams().CarId + '/CarStats');
  },
  showFillups: function() {
   this.transitionTo('/Details/' + this.getParams().CarId + '/Fillups');
  },
  showReminders: function() {
    this.transitionTo('/Details/' + this.getParams().CarId+ '/Reminders');
  },
  handleDetailsTransition: function () {
    console.log("DETAILS TRANSITION");
    setTimeout(this.showCarStats, 700);
    $(this.refs.fillups.getDOMNode()).removeClass("fillupsLeft");
    $(this.refs.reminders.getDOMNode()).removeClass("remindersLeft");
    $(this.refs.fillups.getDOMNode()).removeAttr("style");
    $(this.refs.reminders.getDOMNode()).removeAttr("style");
    $(this.refs.fillups.getDOMNode()).addClass("fillupsRight");
    $(this.refs.reminders.getDOMNode()).addClass("remindersRight");
    this.setState({tab: "stats"});
  },
  handleFillupsTransition: function () {
    setTimeout(this.showFillups, 700);
    $(this.refs.fillups.getDOMNode()).css("left", "50px");
    $(this.refs.reminders.getDOMNode()).removeClass("remindersLeft");
    $(this.refs.reminders.getDOMNode()).removeAttr("style");
    $(this.refs.reminders.getDOMNode()).addClass("remindersRight");
    this.setState({tab: "fillups"});
  },
  handleRemindersTransition: function () {
    setTimeout(this.showReminders, 700);
    $( this.refs.fillups.getDOMNode()).css("left", "50px");
    $( this.refs.reminders.getDOMNode()).css("left", "100px");
    this.setState({tab: "reminders"});
  },
  componentWillReceiveProps: function() {
    console.log("RECEIVE PROPS");
    if (location.hash.indexOf('Fillups') > 0 && this.state.tab != 'fillups')  {
      if (this.state.tab != 'init') this.handleFillupsTransition();
    }
    if (location.hash.indexOf('Reminders') > 0 && this.state.tab != 'reminders')  {
      if (this.state.tab != 'init') this.handleRemindersTransition();
    }
    if (location.hash.indexOf('CarStats') > 0 && this.state.tab != 'stats')  {
      console.log("TAB: " + this.state.tab);
      if (this.state.tab != 'init') this.handleDetailsTransition();
    }
  },
  render: function () {
    console.log('inside AccordionWidget');
    console.log('Function: ' + this.props.handleNewFillup);
    var theCar = this.props.carsData.get(this.getParams().CarId);
    console.log('The car: ' + theCar);
    if (theCar === undefined) return (<div></div>);
    var InnerNodes = [];
    if (location.hash.indexOf('Fillups') > 0)  {
      InnerNodes.push(<div className="accordionWidgetDetails"> <div className="bar" onClick={this.handleDetailsTransition}></div> </div>);
      InnerNodes.push(<div className="accordionWidgetFillups fillupsLeft" ref="fillups" >
        <div className="bar" onClick={this.handleFillupsTransition}></div>
        <div className="fillups-reminders-view">
          <RouteHandler fillups={theCar.get('fillups')} handleNewFillup={this.props.handleNewFillup} handleEditFillup={this.props.handleEditFillup} handleDeleteFillup={this.props.handleDeleteFillup}  />
        </div>      
      </div>);
      InnerNodes.push(<div className="accordionWidgetReminders remindersRight"  ref="reminders" ><div className="bar" onClick={this.handleRemindersTransition}></div></div>);
    }
    else if (location.hash.indexOf('Reminders') > 0)  {
      InnerNodes.push(<div className="accordionWidgetDetails" ><div className="bar" onClick={this.handleDetailsTransition}></div></div>);
      InnerNodes.push(<div className="accordionWidgetFillups fillupsLeft" ref="fillups" ><div className="bar" onClick={this.handleFillupsTransition}></div></div>);
      InnerNodes.push(<div className="accordionWidgetReminders remindersLeft" ref="reminders">
        <div className="bar" onClick={this.handleRemindersTransition}></div>
        <div className="fillups-reminders-view">
          <RouteHandler reminders={theCar.get('reminders')} addReminderButton={true} handleNewReminder={this.props.handleNewReminder} handleEditReminder={this.props.handleEditReminder} handleDeleteReminder={this.props.handleDeleteReminder} />
        </div>
      </div>);
    }
    else {
      var carName = theCar.get('name');
      console.log('Car name from accordion:' + carName);
      InnerNodes.push(<div className="accordionWidgetDetails" >
        <div className="bar" onClick={this.handleDetailsTransition}></div>
        <CarDetailsPane  data={theCar} handleEditCar={this.props.handleEditCar} handleDeleteCar={this.props.handleDeleteCar} />
      </div>);
      InnerNodes.push(<div className="accordionWidgetFillups fillupsRight"  ref="fillups" ><div className="bar" onClick={this.handleFillupsTransition}></div></div>);
      InnerNodes.push(<div className="accordionWidgetReminders remindersRight"  ref="reminders"><div className="bar" onClick={this.handleRemindersTransition}></div></div>);
    }
    return (
        <div className="accordionWidget">
          <div className="accordionWidgetInnerBox">
            {InnerNodes}
          </div>
        </div>
    );
  }
});
module.exports = AccordionWidget;

