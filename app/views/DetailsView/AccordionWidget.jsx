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


var AccordionWidget = React.createClass({
  mixins: [Navigation, Router.State],
  handleClickOn1: function () {
    console.log('handleClickOn1');
    this.transitionTo('/Details/' + this.getParams().CarId);
  },
  handleClickOn2: function () {
    console.log('handleClickOn2');
     this.transitionTo('/Details/' + this.getParams().CarId + '/Fillups');
  },
  handleClickOn3: function () {
    console.log('handleClickOn3');
     this.transitionTo('/Details/' + this.getParams().CarId + '/Reminders');
  },
  render: function () {
    console.log('inside AccordionWidget');
    console.log('Function: ' + this.props.handleNewFillup);
    var theCar = this.props.carsData.get(this.getParams().CarId);
    var InnerNodes = [];
    InnerNodes.push(<AccordionBar writeup={<p>Details</p>} className="accordionWidgetDetails" onBarClick={this.handleClickOn1} />);
    if (location.hash.indexOf('Fillup') > 0) {
      InnerNodes.push(<AccordionBar writeup={<p>Fillups</p>} className="accordionWidgetFillups" onBarClick={this.handleClickOn2} />);
      console.log('Calling FillupsView');
      InnerNodes.push(<RouteHandler fillups={theCar.get('fillups')} handleNewFillup={this.props.handleNewFillup} handleEditFillup={this.props.handleEditFillup} handleDeleteFillup={this.props.handleDeleteFillup}  />);
      InnerNodes.push(<AccordionBar writeup={<p>Reminders</p>} className="accordionWidgetReminders" onBarClick={this.handleClickOn3} />);
    }
    else if (location.hash.indexOf('Reminders') > 0) {
      InnerNodes.push(<AccordionBar writeup={<p>Fillups</p>} className="accordionWidgetFillups" onBarClick={this.handleClickOn2} />);
      InnerNodes.push(<AccordionBar writeup={<p>Reminders</p>} className="accordionWidgetReminders" onBarClick={this.handleClickOn3} />);
      console.log(this.getParams().CarId);
      console.log(theCar);
      console.log('remindersData:' + theCar.get('reminders'));
      InnerNodes.push(<RouteHandler reminders={theCar.get('reminders')} handleNewReminder={this.props.handleNewReminder} handleEditReminder={this.props.handleEditReminder} handleDeleteReminder={this.props.handleDeleteReminder} />);

    }
    else if (theCar != undefined) {
      var carName = theCar.get('name');
      console.log('Car name from accordion:' + carName);
      InnerNodes.push(<RouteHandler data={theCar} handleEditCar={this.props.handleEditCar} handleDeleteCar={this.props.handleDeleteCar}/>);
      InnerNodes.push(<AccordionBar writeup={<p>Fillups</p>} className="accordionWidgetFillups" onBarClick={this.handleClickOn2} />);
      InnerNodes.push(<AccordionBar writeup={<p>Reminders</p>} className="accordionWidgetReminders" onBarClick={this.handleClickOn3} />);
    }
    return (
      <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10 accordionWidget">
        {InnerNodes}
      </div>
    );
  }
});
module.exports = AccordionWidget;

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
