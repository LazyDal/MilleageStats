var React = require('react');
var Backbone = require('backbone');

var Car = require('models/car');

// TODO: send request to the server

//    this.props.handleNewCar(new Car({brand: brand, model:model, year: year, name:name, kmTraveled:odometer, photo: photo, fillups: [], reminders: []}));

    // var brand = this.refs.brand.getDOMNode().value.trim();
    // var model = this.refs.model.getDOMNode().value.trim();
    // var year = this.refs.year.getDOMNode().value.trim();
    // var name = this.refs.name.getDOMNode().value.trim();
    // var odometer = this.refs.odometer.getDOMNode().value.trim();
    // var photo = this.refs.photo.getDOMNode.value;


var NewCarForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var form = this.refs.newCarForm.getDOMNode();
    oData = new FormData(form);

    this.props.handleNewCar(oData);    

    return;
  },
  render: function() {
    newCarStyle = {
      marginLeft: 40,
      marginTop: 40
    }
    console.log("Inside NewCarForm");
    return (
      <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9 newCar" style={newCarStyle}>
        <form className="newCarInnerBox" role="form" encType="multipart/form-data" method="post" ref="newCarForm" onSubmit={this.handleSubmit}>
            <input className="form-control" type="text" size="15" placeholder="Car Brand"   name="brand"          ref="brand" /><br />
            <input className="form-control" type="text" size="15" placeholder="Car Model"   name="model"         ref="model" /><br />
            <input className="form-control" type="text" size="15" placeholder="Model Year"  name="year"            ref="year" /><br />
            <input className="form-control" type="text" size="15" placeholder="Car Name"    name="name"         ref="name" /><br />
            <input className="form-control" type="text" size="15" placeholder="Kilometres"  name="kmTraveled" ref="odometer" /><br />
            <div className="carImageUpload">
              <label className="control-label">Upload car photo</label>
              <input type="file" accept="image/*" name="carImage" ref="photo" />
            </div>
            <br />
            <input type="submit" className="btn btn-default submitButton" value="Submit" />
        </form>
      </div>
    );
  }
});
module.exports = NewCarForm;
''