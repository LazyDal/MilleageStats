var React = require('react');

var CarStats = React.createClass({displayName: "CarStats",
  componentWillReceiveProps: function () {
    console.log('inside receive props CarStats');
    var data = this.props.data;
    this.forceUpdate();
  },
  render: function() {
    console.log('inside CarStats');
    var data = this.props.data;
    return(
      React.createElement("div", null, 
        React.createElement("p", null, "Vehicle Name"), 
        React.createElement("h1", null, data.attributes.name), 
        React.createElement("p", null, "Model Year"), 
        React.createElement("h1", null, data.attributes.year), 
        React.createElement("p", null, "Brand"), 
        React.createElement("h1", null, data.attributes.brand), 
        React.createElement("p", null, "Model"), 
        React.createElement("h1", null, data.attributes.model), 
        React.createElement("p", null, "Odometer"), 
        React.createElement("h1", null, data.attributes.kmTraveled, " kilometers")
      )
    );
  }
});

module.exports = CarStats;
