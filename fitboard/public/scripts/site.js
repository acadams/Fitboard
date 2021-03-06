var athletes= ["Steve A."];
var teams= ["Basketball"];

// From stack overflow post: 
// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$(document).ready(function() {

  $('.photoset-grid-custom').photosetGrid({
      // Set the gutter between columns and rows
      gutter: '5px',
      // Manually set the grid layout
      layout: '4444',
      // Asign a common rel attribute
      rel: 'print-gallery',

      onInit: function(){},
      onComplete: function(){
        // Show the grid after it renders
        $('.photoset-grid-custom').attr('style', '');
        $('.photoset-grid-custom img').css('width', '80%');
      }
    });
    

  

  //gallery links
  $('.photoset-grid-custom').find('img').each(function() {
      $(this).wrap('<a href="fitboard.html"></a>');
    });

  $('.picture').tooltip();

    $('.picture').hover(function(){
      $('.tooltip').css('top', parseInt($(this).position().top) + 130 + 'px')
    });

    
  //if clicked injury tab from calendar view
  console.log();
  var page = document.URL.split('/').reverse();
  if (page[0] == 'fitboard.html#injury') {
    $('.tab-content').find('.tab-pane').each(function() {
      $(this).removeClass('active');
    });
    $('#injury').addClass('active');

    console.log($('.min-menu').find('li:nth-child(2)').text());
    $('.min-menu').find('li').each(function() {
      $(this).removeClass('active');
    });

    $('.min-menu').find('li:nth-child(2)').addClass('active');
  }


  //tabs for profile view
  $('.myTab').click(function (e) {
    e.preventDefault()
    $(this).tab('show');
    
  //adding injuries in profile view
  //needs a backend
    $('#injuryAdd').on('click', function() {
      $('#injuryList').append('<div class="checkbox"><label><input type="checkbox" value="">'+ $('#injuryEnter').val() +'</label></div>');
    });

  });

  $('#team').find('li').on('click', function() {
    $('#team').find('li').removeClass('active');
    $('.sportTeam').html('<h1>' + $(this).find('a').text() + '</h1>');
    $(this).addClass('active');
  });

  //new note listeners
  $('#cancelNote').on('click', function() {
    var result = confirm("Are you sure you want to cancel this note?");

      if (result) {
          window.history.back(-1);
          return false;
      }
  });

  $('#submitNote').on('click', function() {
    $('#noteForm').css('display', 'none');
    $('#submitNote').css('display', 'none');
    $('#cancelNote').css('display', 'none');
    $('.main').append('<div class="alert alert-success">Your note has successfully submitted. You will be redirected to your notes shortly.</div>');
    setTimeout(function() {
      window.history.back(-1);
      return false;
    },4000);
  });


  $("#cancelInj").click(function(evt) {
    var result = confirm("Are you sure you want to cancel this injury report?");

      if (result) {
          window.location = 'fitboard.html#injury';
          return false;
      }
  });

  $('#submitInj').on('click', function() {
    $('#injuryForm').css('display', 'none');
    $('#submitInj').css('display', 'none');
    $('#cancelInj').css('display', 'none');
    $('.main').append('<div class="alert alert-success">Your injury report has successfully submitted. You will be redirected back to the previous page shortly.</div>');
    setTimeout(function() {
      window.history.back(-1);
      return false;
    },4000);
  });

  $("#injuryBtn").click(function(evt) {
    window.location.assign("fitboard6.html");
  });

  // If there is a query for the injury report page,
  // add that to the injury list
  if(window.location.search!=="?" && window.location.search!==""){
    var type= getParameterByName('type');
    var time= getParameterByName('time');
    var body= getParameterByName('body');
    var recovery= getParameterByName('recovery');
    var curInj= document.getElementById('curInj');
    var li= document.createElement('LI');
    var text=document.createTextNode(type+" "+body+"("+time+")");
    li.appendChild(text);
    li.className="list-group-item";
    curInj.appendChild(li);
  }
});
