var React = require('react');
var Backbone = require('backbone');

var Car = require('models/car');

// TODO: send request to the server

var NewCarForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var brand = this.refs.brand.getDOMNode().value.trim();
    var model = this.refs.model.getDOMNode().value.trim();
    var year = this.refs.year.getDOMNode().value.trim();
    var name = this.refs.name.getDOMNode().value.trim();
    var odometer = this.refs.odometer.getDOMNode().value.trim();

    this.props.handleNewCar(new Car({brand: brand, model:model, year: year, name:name, kmTraveled:odometer, fillups: [], reminders: []}));

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
        <form className="newCarInnerBox" role="form" onSubmit={this.handleSubmit}>
          <div class="form-group" style={newCarStyle}>
            <input className="form-control" type="text" size="15" placeholder="Car Brand" ref="brand" /><br />
            <input className="form-control" type="text" size="15" placeholder="Car Model" ref="model" /><br />
            <input className="form-control" type="text" size="15" placeholder="Model Year" ref="year" /><br />
            <input className="form-control" type="text" size="15" placeholder="Car Name" ref="name" /><br />
            <input className="form-control" type="text" size="15" placeholder="Kilometres" ref="odometer" /><br />
            <input type="submit" className="btn btn-default newCarButton" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
});
module.exports = NewCarForm;
''