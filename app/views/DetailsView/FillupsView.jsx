var React = require('react');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;
var RouteHandler = Router.RouteHandler;

var FillupsCollection = require('collections/fillups');
var FillupView = require('views/DetailsView/FillupView.jsx');
var FillupDetailsView = require('views/DetailsView/FillupDetailsView.jsx');
var NewFillupForm = require('views/DetailsView/NewFillupForm.jsx');

/*******************************/
/* fillupsfillups                 */
/* from Accordion Widget       */
/*******************************/

var FillupsView = React.createClass({
  mixins: [Router.State, Navigation],
  getInitialState: function (FillupId) {
    return ({FillupId: ''});
  },
  handleClick: function (FillupId) {
    this.setState({FillupId: FillupId});
    this.transitionTo('/Details/' + this.getParams().CarId + '/Fillups/' + FillupId);
  },
  newFillupClicked: function () {
     this.replaceWith('/Details/' + this.getParams().CarId + '/Fillups/NewFillup');
  },
  render: function() {
    console.log('inside FillupsView');
    var fillupNodes = [];
    var detailsNode = [];
    var selected = "";
    var that = this;
    var fillupsView = new FillupsCollection(this.props.fillups);
    var sortedFillupsView = fillupsView.sortBy('date');
    sortedFillupsView.map(function (fillup) {
      if (that.state.FillupId == fillup.get('_id')) {
        selected = "fillupSelected";
        detailsNode = <RouteHandler fillup={fillup} handleEditFillup={that.props.handleEditFillup} handleDeleteFillup={that.props.handleDeleteFillup}/>
      }
      else selected = "";
      fillupNodes.push(<FillupView className="fillup" fillup={fillup} onFillupClick={that.handleClick} sel={selected} /> );
    });
    if (location.hash.indexOf('New') > 0) {
      detailsNode = <NewFillupForm handleNewFillup={this.props.handleNewFillup} />
    }
    return(
      <div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          {fillupNodes}
          <button type="button" className="btn btn-default" onClick={this.newFillupClicked}>New</button>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          {detailsNode}
        </div>
      </div>
    );
  }
});

module.exports = FillupsView;
