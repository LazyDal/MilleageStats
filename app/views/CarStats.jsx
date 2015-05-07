var React = require('react');

var CarStats = React.createClass({
  componentWillReceiveProps: function () {
    console.log('inside receive props CarStats');
    var data = this.props.data;
    this.forceUpdate();
  },
  render: function() {
    console.log('inside CarStats');
    var data = this.props.data;
    return(
      <div>
        <p>Vehicle Name</p>
        <h1>{data.attributes.name}</h1>
        <p>Model Year</p>
        <h1>{data.attributes.year}</h1>
        <p>Brand</p>
        <h1>{data.attributes.brand}</h1>
        <p>Model</p>
        <h1>{data.attributes.model}</h1>
        <p>Odometer</p>
        <h1>{data.attributes.kmTraveled} kilometers</h1>
      </div>
    );
  }
});

module.exports = CarStats;
