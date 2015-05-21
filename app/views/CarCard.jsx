var React = require('react');
var Backbone = require("backbone");
var Router = require("react-router");
var Navigation = require("react-router").Navigation;

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

// <img className="car_image" alt="Car Image" src={carCard.attributes.pictureFile}></img>

// className={this.props.selectedView==1 ? 'active': ''}

var CarCard = React.createClass({
  mixins: [Navigation, Router.State],
  handleClick: function (e) {
    this.transitionTo('/Details/' +  this.props.data.get('_id')+ '/CarStats');
  },
  detailsClicked: function(e) {
    e.stopPropagation();
     this.transitionTo('/Details/' +  this.props.data.get('_id')+ '/CarStats');
  },
  fillupsClicked: function(e) {
    e.stopPropagation();
    this.transitionTo('/Details/' +  this.props.data.get('_id') + '/Fillups');
  },
  remindersClicked: function(e) {
     e.stopPropagation();
     this.transitionTo('/Details/' +  this.props.data.get('_id')+ '/Reminders');
  },
  render: function() {
    var carCard = this.props.data;
    console.log("Car id:" + carCard.id);
    var carCardClassName = "vehicle HScrollEntry clearfix";
    if (carCard.get('_id') === undefined)
      carCardClassName += "  semiTransparent";
    var carStats = <div></div>;
    if (carCard.get('_id') !== undefined && this.getParams().CarId == carCard.get('_id')) {
      carCardClassName = "vehicle HScrollEntry clearfix selected";
      carStats = 
      <div className="car-stats clearfix">
         <div className="Km_Per_Liter">
           <p className='quantity'>21</p>
           <p className='unit'>kpl</p>
         </div>
         <div className="clearfix">
            <div className="Cost-Per-Km">
              <h4 className='quantity'>18c</h4>
              <p className="unit">per km</p>
            </div>
            <div className='Cost-Per-Month'>
              <p className = 'quantity'>$215</p>
              <p className="unit">per month</p>
            </div>
        </div>
      </div>
    }
    var imageSrc = 'http://localhost:3000/api/cars/' + carCard.id + '/image#' + new Date().getTime();
    return(
      <div className={carCardClassName} onClick={this.handleClick}>
        <div className="header">
            <div className="glass">
              <p className="data-model">{carCard.attributes.year} {carCard.attributes.brand} {carCard.attributes.model}</p>
              <p className="data-name">{carCard.attributes.name}</p>
            </div>
            <div className="overlay">
            </div>
        </div>
        <div className="middleSection">
          <img className="car_image" alt="car image" src={imageSrc} />
          <div className="car_buttons">
            <button type="button" className={this.props.detailsClassName} onClick={this.detailsClicked} >
              <div className="glass"></div>
              <div className="hover"></div>
              <div className="details"></div>
            </button>
            <button type="button" className={this.props.fillupsClassName} onClick={this.fillupsClicked} >
              <div className="glass"></div>
              <div className="hover"></div>
              <div className="fillups"></div>
            </button>
            <button type="button" className={this.props.remindersClassName} onClick={this.remindersClicked} >
              <div className="glass"></div>
              <div className="hover"></div>
              <div className="reminders"></div>
            </button>
          </div>
        </div>
       {carStats}
      </div>
    );
  }
});

module.exports = CarCard;
