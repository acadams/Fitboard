
var clndr = {};

$(document).ready( function() {


  // PARDON ME while I do a little magic to keep these events relevant for the rest of time...
  var currentMonth = moment().format('MMMM YYYY');
  $('#month').append(currentMonth);
  currentMonth = moment().format('MMMM Do YYYY');
  var nextMonth    = moment().add('month', 1).format('YYYY-MM');
  var days;

  
  console.log(moment().format('MMMM Do YYYY'), currentMonth instanceof String, Object.prototype.toString.call(currentMonth));

  var events = [
    { date: String(currentMonth), title: 'Sean Collier Tournament', location: 'Home/MIT' },
    { date: String(currentMonth), title: 'MIT vs Bates', location: 'Bates College' },
    { date: String(currentMonth), title: 'Newmac Tournament', location: 'Springfield College' }
  ];

  // clndr = $('#full-clndr').clndr({
  //   template: $('#full-clndr-template').html(),
  //   events: events,
  //   ready: function() {
  //     days = this.element.find('.days.clearfix').find('.day');

  //   },
  //   clickEvents: {
  //     // fired whenever a calendar box is clicked.
  //     // returns a 'target' object containing the DOM element, any events,
  //     // and the date as a moment.js object.
  //     click: function(target){
  //       console.log(target, events, target.date._i);

  //       //bring up modal and type in event
  //       $('#calModal').modal();
  //       console.log(target.date)
  //       var date = target.date._i;
  //       $('#calModalLabel').html('Add new event for ' + moment(date).format('MMMM Do YYYY'));

  //       $('#saveEvent').on('click', function() {
  //         var eventTitle = $('#eventTitle').val();
  //         var eventDesc = $('#eventDesc').val();
  //         console.log(eventTitle, eventDesc);
  //         var calEvent = '<div class="event-item"><div class="event-item-name">'+eventTitle+'<br>'+ moment(date).format('MMMM Do YYYY') +'</div><div class="event-item-location">'+eventDesc+'</div></div>';
  //         $('.listings').append(calEvent);
  //         $(target.element).addClass('event');
  //         //probs have to add event to the event's list

  //         $('#calModal').modal('hide');
  //       });
        


  //     }
  //   }
  // });

  clndr = $('#mini-clndr').clndr({
    template: $('#mini-clndr-template').html(),
    events: events,
    clickEvents: {
      click: function(target) {
        if(target.events.length) {
          var daysContainer = $('#mini-clndr').find('.days-container');
          daysContainer.toggleClass('show-events', true);
          $('#mini-clndr').find('.x-button').click( function() {
            daysContainer.toggleClass('show-events', false);
          });
        }
      }
    },
    adjacentDaysChangeMonth: true
  });

    // days = $('#mini-clndr').find('.day');
    // days.each(function() {
    //   console.log('hey', this);
    //   $(this).data('toggle', 'modal');
    //   $(this).data('target', '#myModal');
    //   console.log($(this).data());
    // });
    clndr.render();

  

});




