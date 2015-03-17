var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');
var Reminder = require('models/reminder');
var Reminders = require('collections/reminders');

/************************/
/* remindersData        */
/* from AccordionWidget */
/************************/

// .get('reminderText')}</p>);
//
//         var reminder = this.props.data.at(i);
//        console.log(reminder);


var Reminders = React.createClass({displayName: "Reminders",
    render: function() {
      console.log('Inside Reminders');
      var reminderNodes = this.props.data.map(function (reminder) {
        return (React.createElement("p", null, reminder.reminderText));
      });
      return(
        React.createElement("div", null, 
          React.createElement("p", null, "Reminders"), 
          reminderNodes
        )
      );
    }
});

module.exports = Reminders;
