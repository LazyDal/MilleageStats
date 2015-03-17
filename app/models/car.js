var Backbone = require("backbone");

var Car = Backbone.Model.extend({
  defaults: {
    _id: '0',
    year: 2011,
		brand: "Brand",
		model: "Model",
		name: "Car Name",
		pictureFle: "img/car.jpg",
		kmTraveled: 0,
		litresSpent: 0,
		selected: false
  }
});
module.exports = Car;
