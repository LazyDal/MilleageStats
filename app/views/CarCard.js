var React = require('react');
var Backbone = require("backbone");

require('models/car');

// var currentLocation = window.location.href;
// var newLocation = currentLocation.slice(0, currentLocation.length - 1);
// newLocation = newLocation + this.props.data.attributes.id;
// console.log("Location: " + currentLocation);
// console.log("Id: " + this.props.data.attributes.id);

/***********************/
/* data, SelectedId    */
/* From CarsBox        */
/***********************/
/*

handleClick: function (e) {
  console.log("clicked inside car card");
  var currentLocation = window.location.href;
  var n1 = currentLocation.search("#");
  var newLocation = currentLocation.slice(0, n1+1);
  newLocation = newLocation + '/Details/' + this.props.data.attributes.id;
  console.log("Location: " + newLocation);
  console.log("Id: " + this.props.data.attributes.id);

  window.location.href = newLocation;
  window.location.assign(newLocation);
},
detailsClicked: function (e) {
  e.stopPropagation();
  location.hash = "/Details/" + this.props.data.get('id');
},
fillupsClicked: function (e) {
  e.stopPropagation();
  console.log('Inside fillups clicked');
  location.hash = "/Details/" + this.props.data.get('id') + "/Fillups";
},
remindersClicked: function (e) {
  e.stopPropagation();
  location.hash = "/Details/" + this.props.data.get('id') + "/Reminders";
}, */

var CarCard = React.createClass({displayName: "CarCard",

  render: function() {
    var carCard = this.props.data;
    var selectedId = this.props.selectedId;
    var carCardClassName = "car_card HScrollEntry clearfix";
    var carStats = React.createElement("div", null);
    if (selectedId == carCard.attributes.id) {
      carCardClassName = "car_card HScrollEntry clearfix selected";
      carStats = React.createElement("div", null, 
        React.createElement("div", {className: "km_per_liter"}, 
        React.createElement("h1", null, carCard.attributes.kmTraveled/carCard.attributes.litresSpent), 
        React.createElement("p", null, "mpg")
        ), 
        React.createElement("div", {className: "per_mile_per_month"}, 
        React.createElement("h4", null, "18$"), 
        React.createElement("p", null, "per mile"), 
        React.createElement("h3", null, "$215"), 
        React.createElement("p", null, "per month")
        )
      );
    }
    return(
      React.createElement("div", {className: carCardClassName}, 
        React.createElement("p", null, carCard.attributes.year, " ", carCard.attributes.brand, " ", carCard.attributes.model), 
        React.createElement("h4", null, carCard.attributes.name), 
        React.createElement("img", {className: "car_image", alt: "Car Image", src: carCard.attributes.pictureFile}), 
        React.createElement("div", {className: "car_buttons"}, 
          React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.detailsClicked}, "Details"), 
          React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.fillupsClicked}, "Fill ups"), 
          React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.remindersClicked}, "Reminders")
        ), 
       carStats
      )
    );
  }
});

module.exports = CarCard;
