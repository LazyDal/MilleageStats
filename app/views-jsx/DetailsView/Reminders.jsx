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


var Reminders = React.createClass({
    render: function() {
      console.log('Inside Reminders');
      var reminderNodes = this.props.data.map(function (reminder) {
        return (<p>{reminder.reminderText}</p>);
      });
      return(
        <div>
          <p>Reminders</p>
          {reminderNodes}
        </div>
      );
    }
});

module.exports = Reminders;
