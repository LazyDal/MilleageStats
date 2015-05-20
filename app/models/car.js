var Backbone = require("backbone");

var Car = Backbone.Model.extend({
  defaults: {
	brand: "Brand",
	model: "Model",
	year: 0,
	name: "Car Name",
	kmTraveled: 0,
	selected: false
  },
  idAttribute: '_id',
  url: 'api/cars'
});
module.exports = Car;
