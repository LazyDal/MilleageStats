var Backbone = require("backbone");
var Reminder = require('models/reminder');

var Reminders = Backbone.Collection.extend ({
  model: Reminder
});

module.exports = Reminders;
