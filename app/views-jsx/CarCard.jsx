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

//
// location.hash = "/Details/" + this.props.data.get('cid') + "/Fillups";
// location.hash = "/Details/" + this.props.data.get('cid') + "/Reminders";

var CarCard = React.createClass({
  handleClick: function (e) {
    console.log("clicked inside car card");
    location.hash = "/Details/" + this.props.data.get('_id');
  },
  detailsClicked: function (e) {
    e.stopPropagation();
    location.hash = "/Details/" + this.props.data.get('_id');
  },
  fillupsClicked: function (e) {
    e.stopPropagation();
    console.log('Inside fillups clicked');
    location.hash = "/Details/" + this.props.data.get('_id') + "/Fillups";
  },
  remindersClicked: function (e) {
    e.stopPropagation();
    location.hash = "/Details/" + this.props.data.get('_id') + "/Reminders";
  },
  render: function() {
    var carCard = this.props.data;
    var selectedId = this.props.selectedId;
    var carCardClassName = "car_card HScrollEntry clearfix";
    var carStats = <div></div>;
    if (selectedId == carCard.get('_id')) {
      carCardClassName = "car_card HScrollEntry clearfix selected";
      carStats = <div>
        <div className="km_per_liter">
        <h1>{carCard.attributes.kmTraveled/carCard.attributes.litresSpent}</h1>
        <p>mpg</p>
        </div>
        <div className="per_mile_per_month">
        <h4>18$</h4>
        <p>per mile</p>
        <h3>$215</h3>
        <p>per month</p>
        </div>
      </div>;
    }
    return(
      <div className={carCardClassName} onClick={this.handleClick}>
        <p>{carCard.attributes.year} {carCard.attributes.brand} {carCard.attributes.model}</p>
        <h4>{carCard.attributes.name}</h4>
        <img className="car_image" alt="Car Image" src={carCard.attributes.pictureFile}></img>
        <div className="car_buttons">
          <button type="button" className="btn btn-default" onClick={this.detailsClicked}>Details</button>
          <button type="button" className="btn btn-default" onClick={this.fillupsClicked}>Fill ups</button>
          <button type="button" className="btn btn-default" onClick={this.remindersClicked}>Reminders</button>
        </div>
       {carStats}
      </div>
    );
  }
});

module.exports = CarCard;
