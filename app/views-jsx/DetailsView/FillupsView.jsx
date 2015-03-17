var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var _ = require('underscore');

var Fillups = require('collections/fillups')
var Fillup = require('models/fillup')
var FillupView = require('views/DetailsView/FillupView')
var FillupDetailsView = require('views/DetailsView/FillupDetailsView')

/*******************************/
/* fillupsData                 */
/* from Accordion Widget       */
/*******************************/

var FillupsView = React.createClass({
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
  render: function() {
    console.log('inside FillupsView');
    console.log(this.props.data);
    var fillupNodes = [];
    var detailNode = [];
    var selected = "";
    that = this;
    _.each(this.props.data, function (fillup) {
      if (that.state.FillupId == fillup._id) {
        selected = "fillupSelected";
        detailNode = <FillupDetailsView data={fillup} />
      }
      else selected = "";
      fillupNodes.push(<FillupView className="fillup" data={fillup} onFillupClick={that.handleClick} sel={selected}/> );
    });
    return(
      <div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          {fillupNodes}
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          {detailNode}
        </div>
      </div>
    );
  }
});

module.exports = FillupsView;