var React = require('react');
var Backbone = require("backbone");
var Router = require("react-router");
// require('jquery');
// var Router = require('react-router');

var CarCard = require('views/CarCard.jsx');
require('collections/cars');
require('models/car');

// $('.CarsBox').addClass('animated wobble');
/********************/
/* data */
/* from DetailsView */
/********************/

 // var detailsClassName = [], fillupsClassName = [], remindersClassName=[];
 //    var carCards = [];
 //    for (var i =  0; i < this.props.data.length; i++) {
 //      console.log("CarsBox: carCard _id: " + this.props.data.at(i).get('_id'));
 //      if (this.props.data.at(i).get('_id')==that.state.CarId) {
 //        switch(that.state.PressedButton) {
 //          case 1: detailsClassName[i] = "hover active";
 //          break;
 //          case 2: fillupsClassName[i] = "hover active";
 //          break;
 //          case 3: remindersClassName[i] = "hover active";
 //        }
 //      }
 //      else {
 //        detailsClassName[i] = "hover";
 //        fillupsClassName[i] = "hover";
 //        remindersClassName[i] = "hover";
 //      }
 //      carCards.push(<CarCard data={this.props.data.at(i)} selectedId={that.props.selectedId} updateCarsBox={this.updateCarsBox} detailsClassName={detailsClassName[i]} fillupsClassName={fillupsClassName[i]} remindersClassName={remindersClassName[i]} />);
 //    };

var CarsBox = React.createClass({
  mixins: [Router.State],
  getInitialState: function () {
    return ({CarId:0, PressedButton:0});
  },
  render: function() {
    that = this;
    console.log('Inside vehicles render,  carCard _id: ' + this.state.CarId + ' button pressed: ' + this.state.PressedButton);
    var detailsClassName = [], fillupsClassName = [], remindersClassName=[];
    var carCards = [];
    for (var i =  0; i < this.props.data.length; i++) {
      console.log("CarsBox: carCard _id: " + this.props.data.at(i).get('_id'));
      if (this.props.data.at(i).get('_id')==this.getParams().CarId) {
        if (location.hash.indexOf('Fillups') > 0)
          fillupsClassName[i] = "hover active";
        else if (location.hash.indexOf('Reminders') > 0)
          remindersClassName[i] = "hover active";
        else
          detailsClassName[i] = "hover active";
      }
      else {
        detailsClassName[i] = "hover";
        fillupsClassName[i] = "hover";
        remindersClassName[i] = "hover";
      }
      carCards.push(<CarCard data={this.props.data.at(i)} detailsClassName={detailsClassName[i]} fillupsClassName={fillupsClassName[i]} remindersClassName={remindersClassName[i]} />);
    };
    return(
      <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 vehicles smHScrollLgVScroll">
        {carCards}
      </div>
    );
  }
});

module.exports = CarsBox;
