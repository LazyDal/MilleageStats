var Backbone = require("backbone");

var Fillup = Backbone.Model.extend({
  defaults: {
    totalCost: 0,
  totalLiters: 0,
  fillingStation: "",
  odometer: 0,
  date: new Date("Jan 1, 1970"),
  _car: 0
  },
  idAttribute: '_id',
  url: 'api/fillups'
});
module.exports = Fillup;
