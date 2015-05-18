var React = require('react');

var UserRegistration = React.createClass({
  render: function() {
    return(
      <div className="user-registration">
	      <p className="display-title">Complete Your Registration</p>
	      <form role="form">
		  <div class="form-group">
			  <label className="display-label">display name</label>
		        <input className="display-middle form-control" type="text" size="15" placeholder="Sample User" /><br />
		        <label className="display-label">Country or Region</label>
		        <input className="display-middle form-control" type="text" size="15" placeholder="Serbia" /><br />
		        <label className="display-label">Postal Code</label>
		        <input className="display-middle form-control" type="text" size="15"/><br />
		  </div>
	      </form>
	 </div>
    );
  }
});

module.exports = UserRegistration;
