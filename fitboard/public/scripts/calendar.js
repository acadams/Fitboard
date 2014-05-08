
var clndr = {};

$(document).ready( function() {


  // PARDON ME while I do a little magic to keep these events relevant for the rest of time...
  var currentMonth = moment().format('MMMM YYYY');
  $('#month').append(currentMonth);
  currentMonth = moment().format('YYYY-MM-DD');
  var nextMonth = moment().add('month', 1).format('YYYY-MM');
  var days;

  
  console.log(moment().format('MMMM Do YYYY'), currentMonth instanceof String, Object.prototype.toString.call(currentMonth));

  var events = [
    { date: '2014-05-05', title: 'Sean Collier Tournament', location: 'Home/MIT' },
    { date: '2014-05-17', title: 'MIT vs Bates', location: 'Bates College' },
    { date: '2014-05-22', title: 'Newmac Tournament', location: 'Springfield College' }
  ];


  console.log(events);
  clndr = $('#mini-clndr').clndr({
    template: $('#mini-clndr-template').html(),
    events: events,
    clickEvents: {
      click: function(target) {
        console.log(target);
        if(target.events.length) {
          var daysContainer = $('#mini-clndr').find('.days-container');
          daysContainer.toggleClass('show-events', true);
          $('#mini-clndr').find('.events-list').empty();
          for (var i = 0; i < target.events.length; i++) {
            console.log('yo we made it');
            $('#mini-clndr').find('.events-list').append('<div class="event"><a href="#">' + moment(target.events[i].date).format('MMMM Do') + ': ' + target.events[i].title + '</a></div>');
          }

          $('#mini-clndr').find('.x-button').click( function() {
            daysContainer.toggleClass('show-events', false);
          });
        } else { //no events on this day
          var daysContainer = $('#mini-clndr').find('.days-container');
          daysContainer.toggleClass('show-events', true);

          
          $('#mini-clndr').find('.events-list').html('<div class="event" data-event="none">There are no events this day.</div>');
          

          $('#mini-clndr').find('.x-button').click( function() {
            daysContainer.toggleClass('show-events', false);
          });
        }
      }
    },
    adjacentDaysChangeMonth: true
  });

    // days = $('#mini-clndr').find('.day');
    // console.log('days', days);
    // days.each(function() {
    //   console.log('hey', this);
    //   $(this).data('toggle', 'modal');
    //   $(this).data('target', '#calModal');
    //   console.log($(this).data());
    // });
    clndr.render();

    

});




