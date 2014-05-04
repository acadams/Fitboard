var Note = Backbone.Model.extend({

 
    defaults: function() {
      return {
        title: "Here's a new note",
        description: "Enter the description now"
      };
    },
 
    // toggle: function() {
    //   this.save({done: !this.get("done")});
    // }

  });

var Injury = Backbone.Model.extend({

	defaults: function() {
		return {
			description: "Injury report..."
      active: false
		};
	}  

});

var Regimen = Backbone.Model.extend({

  defaults: function() {
    return {
      description: "Regimen item..."
    };
  }

});

var RegimenView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  render: function() {
    var template = _.template( $('#regimen').html(), {} );
    this.$el.html( template );
  }

});


var CalEvent = Backbone.Model.extend({
  defaults: function() {
    return {
      date: Date.now(),
      title: "Event title",
      description: "Event description..."
    };
  }
});

var CalEventList = Backbone.Collection.extend({

  localStorage = new Backbone.LocalStorage("fitboard-items"),

});

var RegimenList = Backbone.Collection.extend({

  localStorage = new Backbone.LocalStorage("fitboard-items"),

});

var NotesList = Backbone.Collection.extend({

  localStorage = new Backbone.LocalStorage("fitboard-items"),


});

var InjuryList = Backbone.Collection.extend({

  localStorage = new Backbone.LocalStorage("fitboard-items"),


});
