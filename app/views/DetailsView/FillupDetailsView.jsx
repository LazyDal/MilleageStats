var React = require('react');
var Backbone = require('backbone');
var EditFillupForm = require('views/DetailsView/EditFillupForm.jsx');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;
var RouteHandler = Router.RouteHandler;
var _ = require('underscore');

var Fillup = require('models/fillup');
var Car = require('models/car');
// d = new Date(this.props.fillup.date);
// date = d.toDateString() + ' ' + d.toTimeString();
// if (location.hash.indexOf("Edit" > 0)) {
//  <EditFillupForm />
// }
//  else {

/* console.log('Inside FillupDetailsView');
if
}
else { */

var FillupDetailsView = React.createClass({
  mixins: [Navigation, Router.State],
  handleDeleteClick: function () {
    this.props.handleDeleteFillup(this.getParams().CarId, this.getParams().FillupId);
  },
  handleEditClick: function () {
    this.replaceWith('/Details/' + this.getParams().CarId + '/Fillups/' + this.getParams().FillupId + '/EditFillup'); 
  },
  render: function () {
      var componentStyle = {
        width: '270px'
      };
      console.log("From FillupDetailsView: " + this.props.fillup);
        if (location.hash.indexOf('Edit')>0) {
          console.log("Inside EditFillupsView");
          return(<RouteHandler fillup={this.props.fillup} handleEditFillup={this.props.handleEditFillup}/>);
        } else {
          console.log("Inside FillupDetailsView");
          return (
          <div style={componentStyle}>
            <p>totalCost</p>
            <h4>{this.props.fillup.get('totalCost')}</h4>
            <p>Total Liters</p>
            <h4>{this.props.fillup.get('totalLiters')}</h4>
            <p>Filling Station</p>
            <h4>{this.props.fillup.get('fillingStation')}</h4>
            <p>Odometer</p>
            <h4>{this.props.fillup.get('odometer')}</h4>
            <p>Date</p>
            <h4>{this.props.fillup.get('date')}</h4>
            <button type="button" className="btn btn-default" onClick={this.handleEditClick}>Edit</button>
            <button type="button" className="btn btn-default" onClick={this.handleDeleteClick}>Delete</button>
          </div>
        );
      }
    }
});

module.exports = FillupDetailsView;
