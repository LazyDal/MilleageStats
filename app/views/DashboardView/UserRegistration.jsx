var React = require('react');

var UserRegistration = React.createClass({
  render: function() {
    return(
      <form>
        <input type="text" placeholder="Sample User" />
        <input type="text" placeholder="Country or Area" />
        <input type="text" placeholder="Postal Code" />
      </form>
    );
  }
});

module.exports = UserRegistration;
