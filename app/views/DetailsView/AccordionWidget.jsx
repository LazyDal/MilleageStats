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

  // componentWillReceiveProps: function () {
  //   this.forceUpdate();
  // },

// this.transitionTo('/Details/' + this.getParams().CarId + '/Reminders');

var AccordionWidget = React.createClass({
  mixins: [Navigation, Router.State],
  animateReminder: function () {
    this.transitionTo('/Details/' + this.getParams().CarId + '/Reminders');
  },
  animateFillups: function () {
    this.transitionTo('/Details/' + this.getParams().CarId + '/Fillups');
  },
  animateDetails: function () {
     this.transitionTo('/Details/' + this.getParams().CarId);
  },
  handleClickOnDetails: function () {
    setTimeout(this.animateDetails, 700);
    $(this.refs.fillups.getDOMNode()).removeClass("fillupsLeft");
    $(this.refs.reminders.getDOMNode()).removeClass("remindersLeft");
    $(this.refs.fillups.getDOMNode()).removeAttr("style");
    $(this.refs.reminders.getDOMNode()).removeAttr("style");
    $(this.refs.fillups.getDOMNode()).addClass("fillupsRight");
    $(this.refs.reminders.getDOMNode()).addClass("remindersRight");
  },
  handleClickOnFillups: function () {
    setTimeout(this.animateFillups, 700);
    $(this.refs.fillups.getDOMNode()).css("left", "50px");
    $(this.refs.reminders.getDOMNode()).removeClass("remindersLeft");
    $(this.refs.reminders.getDOMNode()).removeAttr("style");
    $(this.refs.reminders.getDOMNode()).addClass("remindersRight");
  },
  handleClickOnReminders: function () {
    setTimeout(this.animateReminder, 700);
    $( this.refs.fillups.getDOMNode()).css("left", "50px");
    $( this.refs.reminders.getDOMNode()).css("left", "100px");
  },
  render: function () {
    console.log('inside AccordionWidget');
    console.log('Function: ' + this.props.handleNewFillup);
    var theCar = this.props.carsData.get(this.getParams().CarId);
    console.log('The car: ' + theCar);
    var InnerNodes = [];
    if (location.hash.indexOf('Fillups') > 0)  {
      InnerNodes.push(<div className="accordionWidgetDetails" onClick={this.handleClickOnDetails}></div>);
      InnerNodes.push(<div className="accordionWidgetFillups fillupsLeft" onClick={this.handleClickOnFillups} ref="fillups" >
        <RouteHandler fillups={theCar.get('fillups')} handleNewFillup={this.props.handleNewFillup} handleEditFillup={this.props.handleEditFillup} handleDeleteFillup={this.props.handleDeleteFillup}  />
      </div>);
      InnerNodes.push(<div className="accordionWidgetReminders remindersRight"  onClick={this.handleClickOnReminders} ref="reminders" ></div>);
    }
    else if (location.hash.indexOf('Reminders') > 0)  {
      InnerNodes.push(<div className="accordionWidgetDetails" onClick={this.handleClickOnDetails}></div>);
      InnerNodes.push(<div className="accordionWidgetFillups fillupsLeft" onClick={this.handleClickOnFillups} ref="fillups" ></div>);
      InnerNodes.push(<div className="accordionWidgetReminders remindersLeft" onClick={this.handleClickOnReminders} ref="reminders">
        <RouteHandler reminders={theCar.get('reminders')} handleNewReminder={this.props.handleNewReminder} handleEditReminder={this.props.handleEditReminder} handleDeleteReminder={this.props.handleDeleteReminder} />
      </div>);
    }
    else {
      var carName = theCar.get('name');
      console.log('Car name from accordion:' + carName);
      InnerNodes.push(<div className="accordionWidgetDetails" onClick={this.handleClickOnDetails}>
        <RouteHandler data={theCar} handleEditCar={this.props.handleEditCar} handleDeleteCar={this.props.handleDeleteCar} />
      </div>);
      InnerNodes.push(<div className="accordionWidgetFillups fillupsRight"  onClick={this.handleClickOnFillups} ref="fillups" ></div>);
      InnerNodes.push(<div className="accordionWidgetReminders remindersRight"   onClick={this.handleClickOnReminders} ref="reminders"></div>);
    }
    return (
      <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
        <div className="accordionWidget">
          <div className="accordionWidgetInnerBox">
            {InnerNodes}
          </div>
        </div>
      </div>
    );
  }
});
module.exports = AccordionWidget;

        // 

// InnerNodes.push(<RouteHandler fillupsData={this.props.fillupsData} fillupsIndexes={that.props.carData.get('fillups')}  />);
// InnerNodes.push(<CarDetailsPane data={this.props.carsData} remindersData={this.props.remindersData} className="accordionWidgetShrinked" />);

// componentWillReceiveProps: function () {
//   this.forceUpdate();
// },

// findWhere({_id:

          // this.props.carsData.fetch();
// location.hash = "/Details/" + this.props.selectedCar + "/Fillups";
    // $.ajax({
    //   url: '/api/cars/',
    //   type: 'PUT',
    //   data: this.props.carsData.get(this.props.selectedCar),
    //   success: function(result) {
    //     console.log('jQuery patch done.');
    //   }
    //   location.hash = "/Details/" + this.props.selectedCar + "/Fillups";
    // });

    // this.props.carsData.get(this.props.selectedCar).fetch();
    //  location.hash = "/Details/" + this.props.selectedCar + "/Fillups";

 // $.ajax({
 //      url: '/api/newfillup/' + this.props.selectedCar,
 //      dataType: 'json',
 //      type: 'POST',
 //      data: fillup,
 //      success: function(fillup) {
 //        location.hash = "/Details/" + this.props.selectedCar + "/Fillups";
 //      }.bind(this),
 //      error: function(xhr, status, err) {
 //        console.error(this.props.url, status, err.toString());
 //      }.bind(this)
 //    });
