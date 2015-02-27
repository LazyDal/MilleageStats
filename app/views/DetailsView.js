var React = require('react');
var Backbone = require('backbone');

var Cars = require('collections/cars');

var CarsBox = require('views/CarsBox');
// var CarDetailsPane = require('views/DetailsView/CarDetailsPane');
// var AccordionWidget = require('views/DetailsView/AccordionWidget');

/***************************************/
/* carData, remindersData, fillupsData */
/* sent by app.jsx                     */
/***************************************/


// <div className = "contentSection">
//   <CarsBox data={this.state.cars} selectedId={this.state.CarId} />
// </div>


var DetailsView = React.createClass({displayName: "DetailsView",
  getInitialState: function () {
    return {cars: [], CarId: 1 };
  },
  componentDidMount: function () {
    this.props.cars.on('sync', function(){
       this.setState({cars: this.props.cars});
    }.bind(this));

    this.props.cars.fetch();

    console.log('From DetailsView: ');
    var carCards = this.state.cars.map(function (acar) {
      console.log(acar);
    });
    console.log('From DetailsView: ' + this.state.cars);
  },
  render: function() {
    console.log('inside Details render');
    return(
      React.createElement("div", {className: "contentSection"}, 
        React.createElement(CarsBox, {data: this.state.cars, selectedId: this.state.CarId})
      )
    );
  }
});

module.exports = DetailsView;
