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

var RegimenView = Backbone.View.extend({//must pass in model, and input

  tagName: "li",

  template = _.template( $('#regimen').html()),

  events: {
    "dblclick .view"  : "edit",
    "click a.destroy" : "clear",
    "keypress .edit"  : "updateOnEnter",
    "blur .edit"      : "close"
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.input = this.$('.edit');
    return this;
  },

  render: function() {
    this.$el.html( this.template(this.model.toJSON()) ); //template in index.html in a script that serves as the template
  },

  edit: function() {
    this.$el.addClass('editing');
    this.input.focus();
  },

  clear: function() {
    this.model.destroy();
  }


  close: function() {
    var value = this.input.val();
    if (!value) {
      this.clear();
    } else {
      this.model.save({title: value});
      this.$el.removeClass("editing");
    }
  },

  updateOnEnter: function(e) {
    if (e.keyCode == 13) this.close();
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
  model: CalEvent,
  localStorage = new Backbone.LocalStorage("fitboard-items"),

});

var CalEvents = new CalEventList;

var RegimenList = Backbone.Collection.extend({
  model: Regimen,
  localStorage = new Backbone.LocalStorage("fitboard-items"),

});

var RegimenItems = new RegimenList;

var NotesList = Backbone.Collection.extend({
  model: Note,
  localStorage = new Backbone.LocalStorage("fitboard-items"),
});

var Notes = new NotesList;

var InjuryList = Backbone.Collection.extend({
  model: Injury,
  localStorage = new Backbone.LocalStorage("fitboard-items"),

});

var Injuries = new InjuryList;


var AppView = Backbone.View.extend({

  el: $('#fitboardapp'),

  initialize: function() {

    this.regimenInput = this.$("#new-regimen");
    this.noteInput = this.$("#new-note");
    this.injuryInput = this.$("#new-injury");
    this.calEventInput = this.$("#new-calevent");

    this.listenTo(RegimenItems, 'add', this.addOne);
    this.listenTo(RegimenItems, 'reset', this.addAll);
    this.listenTo(RegimenItems, 'all', this.render);


    this.main = $('#main-fitboard');

    CalEvents.fetch();
    RegimenItems.fetch();
    Notes.fetch();
    Injuries.fetch();

  },

  render: function() {
    this.main.show();

  }

  addOne: function(model) {
    var view;
    switch (instanceof model) {
      case 'CalEvent':
        view = new CalEventView({model: model});
        // this.$("#cal-list").append(view.render().el);
      case 'Note':
        view = new NoteView({model: model});
        this.$("#note-list").append(view.render().el);
      case 'Injury':
        view = new InjuryView({model: model});
        this.$("#injury-list").append(view.render().el);
      default:
        view = new RegimenView({model: model});
        this.$("#regimen-list").append(view.render().el);
    }


  }

});
