var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');

/************************/
/* remindersreminders        */
/* from AccordionWidget */
/************************/

// .get('reminderText')}</p>);
//
//         var reminder = this.props.reminders.at(i);
//        console.log(reminder);


var Reminders = React.createClass({
    render: function() {
      console.log('Inside Reminders');
      var reminderNodes = this.props.reminders.map(function (reminder) {
        d = new Date(reminder.dueDate);
        date = d.toDateString() + ' ' + d.toTimeString();
        return (<div>
                  <p>{reminder.reminderText}</p>
                  <p>Due Date: {date}</p>
                </div>);
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
