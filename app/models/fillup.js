var Backbone = require("backbone");
var Fillup = Backbone.Model.extend({
  defaults: {
    totalCost: 0,
    totalLiters: 0,
    fillingStation: "",
    odometer:0,
    date: 0
  },
  idAttribute: '_id'
});
module.exports = Fillup;
