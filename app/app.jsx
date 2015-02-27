var Backbone = require('backbone');
var React = require('react');

var Car = require('models/car');
var Cars = require('collections/cars');

var DetailsView = require('views/DetailsView');

var cars = new Cars();

var App = React.createClass({
  render: function () {
    return (
      <div>
        <DetailsView cars={this.props.cars}/>
      </div>
    );
  }
});

React.render(<App cars = {cars} />, document.body);
