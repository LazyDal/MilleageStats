var Backbone = require("backbone");
var Reminder = Backbone.Model.extend({
  defaults: {
    reminderText: "",
    dueDate: 0
  },
  idAttribute: '_id'
});
module.exports = Reminder;
