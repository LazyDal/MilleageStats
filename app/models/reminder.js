var Backbone = require("backbone");
var Reminder = Backbone.Model.extend({
  defaults: {
    id: 1,
    reminderText: ""
  },
});
module.exports = Reminder;
