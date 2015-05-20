var React = require('react');
var Backbone = require('backbone');
var Router = require('react-router');
var Car = require('models/car');

// TODO: send request to the server

var EditCarForm = React.createClass({
  mixins: [Router.State],
  handleSubmit: function(e) {
    e.preventDefault();
    
    var theCar = this.props.data;
    
    if (this.refs.brand.getDOMNode().value.trim() === "") this.refs.brand.getDOMNode().value = theCar.get('brand');
    if (this.refs.model.getDOMNode().value.trim() ==="") this.refs.model.getDOMNode().value = theCar.get('model');
    if (this.refs.year.getDOMNode().value.trim() ==="") this.refs.year.getDOMNode().value = theCar.get('year');
    if (this.refs.name.getDOMNode().value.trim() ==="") this.refs.name.getDOMNode().value = theCar.get('name');
    if (this.refs.odometer.getDOMNode().value.trim()==="") this.refs.odometer.getDOMNode().value = theCar.get('kmTraveled');

    oData = new FormData(this.refs.editCarForm.getDOMNode());
    oData.append("_id", this.props.data.get('_id'));
    this.props.handleEditCar(oData, this.props.data.get('_id'));

    return;
  },
  render: function() {
    var theCar = this.props.data;
    return (
      <form className="editCarForm" encType="multipart/form-data" method="put" ref="editCarForm" onSubmit={this.handleSubmit}>
            <label className="display-label">Car Brand</label>
            <input className="form-control" type="text" placeholder={theCar.get('brand')} name="brand" ref="brand" /><br />
            <label className="display-label">Car Model</label>
            <input className="form-control" type="text" placeholder={theCar.get('model')} name="model" ref="model" /><br />
            <label className="display-label">Model Year</label>
            <input className="form-control" type="text" placeholder={theCar.get('year')} name="year" ref="year" /><br />
            <label className="display-label">Car Petname</label>
             <input className="form-control" type="text" placeholder={theCar.get('name')} name="name"  ref="name" /><br />
            <label className="display-label">Odometer</label>
            <input className="form-control" type="text" placeholder={theCar.get('kmTraveled')} name="kmTraveled" ref="odometer" /><br />
            <div className="carImageUpload">
              <label className="control-label">Upload car photo</label>
              <input type="file" accept="image/*" name="carImage" ref="photo" />
            </div>
            <br />
            <input type="submit" className="btn btn-default submitButton" value="Submit" />
      </form>
    );
  }
});
module.exports = EditCarForm;
