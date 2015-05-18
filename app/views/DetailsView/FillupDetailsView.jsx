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
  handleDeleteClick: function (e) {
    e.stopPropagation();
    this.props.handleDeleteFillup(this.getParams().CarId, this.getParams().FillupId);
  },
  handleEditClick: function (e) {
    e.stopPropagation();
    this.replaceWith('/Details/' + this.getParams().CarId + '/Fillups/' + this.getParams().FillupId + '/EditFillup'); 
  },
  render: function () {
      console.log("From FillupDetailsView: " + this.props.fillup);
        if (location.hash.indexOf('Edit')>0) {
          console.log("Inside EditFillupsView");
          return(<RouteHandler fillup={this.props.fillup} handleEditFillup={this.props.handleEditFillup}/>);
        } else {
          date= new Date(this.props.fillup.get('date'));
          console.log("Inside FillupDetailsView");
          return (
          <div className="display">
            <button type="button" className="btn btn-default" onClick={this.handleEditClick}>Edit</button>
            <button type="button" className="btn btn-default" onClick={this.handleDeleteClick}>Delete</button>
            <p className="display-label">totalCost</p>
            <p className="display-field">{this.props.fillup.get('totalCost')}</p>
            <p className="display-label">Total Liters</p>
            <p className="display-field">{this.props.fillup.get('totalLiters')}</p>
            <p className="display-label">Filling Station</p>
            <p className="display-field">{this.props.fillup.get('fillingStation')}</p>
            <p className="display-label">Odometer</p>
            <p className="display-field">{this.props.fillup.get('odometer')}</p>
            <p className="display-label">Date</p>
            <p className="display-field">{this.props.fillup.get('date').toLocaleDateString()}</p>
          </div>
        );
      }
    }
});

module.exports = FillupDetailsView;
