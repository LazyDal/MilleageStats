var Backbone = require("backbone");

var Car = Backbone.Model.extend({
  defaults: {
    year: 2011,
		brand: "Brand",
		model: "Model",
		name: "Car Name",
		pictureFle: "img/car.jpg",
		kmTraveled: 0,
		litresSpent: 0,
    reminders: [],
    fillups: [],
		selected: false
  },
  idAttribute: '_id'
});
module.exports = Car;
