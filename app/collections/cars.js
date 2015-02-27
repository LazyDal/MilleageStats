var Backbone = require("backbone");
var Car = require('models/car');

var Cars = Backbone.Collection.extend ({
	model: Car,
	url: '/api/cars'
});
module.exports = Cars;
