var Backbone = require("backbone");
var Fillup = Backbone.Model.extend({
  defaults: {
    id: 0,
    totalCost: 0,
    totalLiters: 0,
    fillingStation: "",
    odometer:0
  },
});
module.exports = Fillup;
