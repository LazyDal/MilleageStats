var Backbone = require("backbone");

var Car = Backbone.Model.extend({
  defaults: {
    year: 0,
	brand: "Brand",
	model: "Model",
	name: "Car Name",
	pictureFile: "img/car.jpg",
	kmTraveled: -1,
	litresSpent: -1,
	selected: false
  },
  idAttribute: '_id',
  url: 'api/cars'
});
module.exports = Car;
