var Backbone = require("backbone");

var Reminder = Backbone.Model.extend({
  defaults: {
    reminderText: "",
  dueDate: new Date("Jan 1, 1970"),
  _car: 0
  },
  idAttribute: '_id',
  url: 'api/fillups'
});
module.exports = Reminder;
