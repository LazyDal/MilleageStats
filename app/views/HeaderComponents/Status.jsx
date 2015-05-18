var React = require('react');
$ = require('jquery');

var Status = React.createClass({
  componentWillReceiveProps: function (nextProps) {
    console.log("REFRESHING STATUS FROM HEADER: " + nextProps.refreshShow);
    if (nextProps.refreshShow)
      $(this.refs.status.getDOMNode()).css("opacity", 1);
  },
  fadeOut: function () {
    $(this.refs.status.getDOMNode()).css("opacity", 0);
  },
  render: function() {
    if (this.props.fadeOut)
    	setTimeout(this.fadeOut, 3000);
    return(
      <div className="status" ref="status">
        <p>{this.props.status}</p>
      </div>
    );
  }
});

module.exports = Status;
