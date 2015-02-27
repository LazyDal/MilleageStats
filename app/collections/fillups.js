var Backbone = require("backbone");
var Fillup = require('models/fillup');

var Fillups = Backbone.Collection.extend ({
  model: Fillup
});

module.exports = Fillups;
