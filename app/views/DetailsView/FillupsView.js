var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var _ = require('underscore');

var FillupView = require('views/DetailsView/FillupView')
var FillupDetailsView = require('views/DetailsView/FillupDetailsView')

/*******************************/
/* fillupsfillups                 */
/* from Accordion Widget       */
/*******************************/

var FillupsView = React.createClass({displayName: "FillupsView",
  mixins: [Router.State],
  getInitialState: function () {
    return ({FillupId: ''});
  },
  componentWillReceiveProps: function () {
    this.setState({FillupId: this.getParams().FillupId});
  },
  handleClick: function (Id) {
      location.hash = "/Details/" + this.props.selectedCar + "/Fillups" +  '/' + Id;
  },
  newFillupClicked: function () {
    location.hash = "/Details/" + this.props.selectedCar + "/NewFillup";
  },
  render: function() {
    console.log('inside FillupsView');
    console.log(this.props.fillups);
    var fillupNodes = [];
    var detailsNodes = [];
    var selected = "";
    var that = this;
    _.each(this.props.fillups, function (fillup) {
      console.log(fillup);
      if (that.state.FillupId == fillup._id) {
        selected = "fillupSelected";
        detailsNodes = React.createElement(FillupDetailsView, {fillup: fillup})
      }
      else selected = "";
      fillupNodes.push(React.createElement(FillupView, {className: "fillup", fillup: fillup, onFillupClick: that.handleClick, sel: selected, handleNewFillupForm: this.handleNewFillupForm}) );
    });
    return(
      React.createElement("div", null, 
        React.createElement("div", {className: "col-xs-12 col-sm-12 col-md-6 col-lg-6"}, 
          fillupNodes, 
          React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.newFillupClicked}, "New")
        ), 
        React.createElement("div", {className: "col-xs-12 col-sm-12 col-md-6 col-lg-6"}, 
          detailsNodes
        )
      )
    );
  }
});

module.exports = FillupsView;
