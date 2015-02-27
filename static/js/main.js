var Car = require('car');
var Cars = require('cars');

var carsData = [{"id": 1, "year": 2011,"brand": "Ford","model": "Escort","name":"Пословна Кола","pictureFle":"img/car1","kmTraveled": 15,"litersSpent": 6, "selected": false }, {"id": 2, year: 2011,brand: "Opel",model: "Meriva A",name:"Кућевна Кола",pictureFle: "img/car1", "kmTraveled": 15, "litersSpent": 6, "selected": false}];
/* var fillUpsData = [{"id": 1, "date": "June 4 2014", "total_cost": 30.92, "litersFilled": 52, "costPerLiter": 2, "fillingStation": "Margie's Travel", "ocometer": 39.584, "fees": 0, "comments": ""}, {"id": 2, "date": "August 14 2014", "total_cost": 27, "litersFilled": 42, "costPerLiter": 2, "fillingStation": "Zoran's Station", "ocometer": 41.284, "fees": 0, "comments": ""}];
var remindersData = [{"id": 1, "text": "Check Wiper Fluid", "date": "4 Aug 2014", "car": 1}, {"id": 2, "text": "Check Wiper Fluid", "date": "5 Aug 2014", "car": 2}, {"id": 3, "text": "Check Wiper Fluid", "date": "15 Aug 2014", "car": 3}, {"id": 4, "text": "Vacuum Car", "date": "4 March 2015", "car": 1}, {"id": 5, "text": "Vacuum Car", "date": "5 March 2015", "car": 2}, {"id": 6, "text": "Vacuum Car", "date": "4 March 2015", "car": 3}]; */


/* var Fillup = Backbone.Model.extend({
	defaults: {
		id: 1,
		date: "Jan 1 1970",
		total_cost: 0,
		litersFilled: 0,
		costPerLiter: 0,
		fillingStation: "",
		ocometer: 0, 
		fees: 0,
		comments: ""
	},
});
var Reminder = Backbone.Model.extend({
	defaults: {
		id: 1,
		text: "",
		date: "Jan 1 1970",
		car: 0
	}
}); */

/* var Fillups = Backbone.Collection.extend ({
	model: Fillup,
});
var Reminders = Backbone.Collection.extend ({
	model: Reminder,
}); */

/* var CarDataView = Backbone.View.extend({
	el: '.car_data',
	template: '<div class="car_kpl"><h1>20</h1>kpl</div><div class="car_cost"><h4>18 &#x00a2</h4>per km<br /><h4>$215</h4>per month</div>',
	render: function() {
		var tmpl = _.template(this.template);
		this.$el.html(tmpl());
		return this;
	}
});  */

var CarView = Backbone.Layout.extend({
	template: "#carView",
	el: false,
	events: {
		'click': '_selectCarCard'
	},
	_selectCarCard: function(ev) {
		ev.preventDefault();
		// console.log($(ev.currentTarget).html());
		if (!this.model.attributes.selected) {
			this.model.collection.selectByID(this.model.attributes.id);
		}
		console.log("Rendering cars:");
		carsListView.renderViews();
	},
	afterRender: function() {
		this.$el.toggleClass('selected', this.model.attributes.selected);
	}
});
/*
var FillUpView = Backbone.View.extend({
	tagName: 'div',
	className: 'fillup_item boxed',
	template: '<h5><%= date %></h5><h5><%= total_cost %></h5><h5><%= litersFilled %></h5><h5><%= costPerLiter %></h5><h5><%= fillingStation %></h5><h5><%= ocometer %></h5><h5><%= fees %></h5><h5><%= comments %></h5>',
	render: function () {
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.toJSON()));
		return this;
	}
});
var RemindersView = Backbone.View.extend({
	el: "#reminders",
	template: '<h6>Here will go list of reminders</h6>',
	render: function () {
		var tmpl = _.template(this.template);
		this.$el.html(tmpl());
		return this;
	}
}); */
/* var CarDetailsView = Backbone.View.extend({
	el: "#car_details",
	template: '<h6>Here will go car details</h6>',
	render: function () {
		var tmpl = _.template(this.template);
		this.$el.html(tmpl());
		return this;
	}
});

var FillUpsView = Backbone.View.extend({
	el: "#fillups",
	render: function() {
		var fillUpsView = this.collection.map(function(fillup) {
			return (new FillUpView({model : fillup})).render().el;
		});
		this.$el.html(fillUpsView);
		return this;
	}
}); */

var FillupsView = Backbone.Layout.extend({
 	template: "#fillupsView",
 	el: false
});
var RemindersView = Backbone.Layout.extend({
	 template: "#remindersView",
	 el: false
});
var detailsView = new Backbone.Layout({
	template:  "#detailsView",
	el: false,
	views: {
		"#fillups_view":  new FillupsView(),
		"#reminders_view": new RemindersView()
	}
});

var carsListView = new Backbone.Layout ({
	template: "#carListView",
	el: false
}); 


var cars = new Cars(carsData);
/*var fillUps = new Fillups(fillUpsData);
var reminders = new Reminders(remindersData); 
var detailsView = new DetailsView(); */

// var carsListView = new CarsList({collection: cars});

$( document ).ready(function() {
	cars.map(function(car) {
		carsListView.insertView(new CarView({model : car, el:false }));
	});
  	carsListView.$el.appendTo('#car_list_view');
  	carsListView.render();
  	detailsView.$el.appendTo('#details_view');
  	detailsView.render();
});