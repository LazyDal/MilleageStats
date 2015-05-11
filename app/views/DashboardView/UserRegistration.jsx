var React = require('react');

var UserRegistration = React.createClass({
  render: function() {
    return(
      <form>
        <input type="text" placeholder="Sample User" /><br />
        <input type="text" placeholder="Country or Area" /><br />
        <input type="text" placeholder="Postal Code" /><br />
      </form>
    );
  }
});

module.exports = UserRegistration;
