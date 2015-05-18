var React = require('react');
var Router = require('react-router');

var CarStats = React.createClass({
    mixins: [Router.State, Router.Navigation],
   editClicked: function () {
    this.transitionTo('/Details/' + this.getParams().CarId + '/EditCar');
  },
  deleteClicked: function () {
    this.props.handleDeleteCar(this.getParams().CarId);
  },
  render: function() {
    console.log('inside CarStats');
    var data = this.props.data;
    return(
      <div className="display">
        <button type="button" className="btn btn-default" onClick={this.editClicked}>Edit</button>
        <button type="button" className="btn btn-default" onClick={this.deleteClicked}>Delete</button>
        <p className="display-label">Vehicle Name</p>
        <p className="display-field">{data.attributes.name}</p>
        <p className="display-label">Model Year</p>
        <p className="display-field">{data.attributes.year}</p>
        <p className="display-label">Brand</p>
        <p className="display-field">{data.attributes.brand}</p>
        <p className="display-label">Model</p>
        <p className="display-field">{data.attributes.model}</p>
        <p className="display-label">Odometer</p>
        <p className="display-field">{data.attributes.kmTraveled} kilometers</p>
      </div>
    );
  }
});

module.exports = CarStats;
