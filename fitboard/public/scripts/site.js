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

  //first initialize all the saved shit
  //so regimen, injuries, notes, cal events

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

//injury modal stuff
  $("#injuryBtn").click(function(evt) {
      $('#myModal').modal();
      $('#myModalLabel').html('Add New Injury Report');
      $('.modal-body').html('<form class="form-horizontal" role="form" action="injuryrep.html" id="injuryForm"><div id="typeInj" class="form-group"><label for="type" class="col-sm-2 control-label"> Type </label><div class="col-sm-10"><input  class="form-control" type="text" id="type" name="type" placeholder="Type of injury"/></div></div><div id="bodyPart" class="form-group"><label for="body" class="col-sm-2 control-label"> Body Part </label><div class="col-sm-10"><input  class="form-control" type="text" id="body" name="body" placeholder="Body parts/muscle groups affected"/></div></div><div id="timeInj" class="form-group"><label for="time" class="col-sm-2 control-label"> Time </label><div class="col-sm-10"><input  class="form-control" type="text" id="time" name="time" placeholder="Time Injury Occurred"/></div></div><div id="recovery" class="form-group"><label for="recovery" class="col-sm-2 control-label"> Expected Recovery Date </label><div class="col-sm-10"><input  class="form-control" type="text" id="recovery" name="recovery" placeholder="Expected Date for Full Recovery" style="margin-top: 15px"/></div></div></form></div>');

      $(".modal-footer").html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" data-dismiss="modal" id="saveInjury">Save Injury</button>');

      $('#saveInjury').on('click', function() {

        $('#myModal').modal('hide');
      });

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


  //NOTES MODAL STUFF
  $('#saveNote').html('Save Note');
  $("#noteBtn").click(function(evt) {
      $('#myModal').modal();
      $('#myModalLabel').html('Add New Note');
      $('.modal-body').html('<form role="form" id="noteForm"><div class="form-group"><input type="text" class="form-control" placeholder="Subject"></div><div class="form-group">            <textarea class="form-control" rows="10" placeholder="Type your message here..."></textarea></div></form>');
      $(".modal-footer").html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" data-dismiss="modal" id="saveNote">Save Note</button>');



      $('#saveNote').on('click', function() {

        $('#myModal').modal('hide');
      });

  });

  //REGIMEN MODAL STUFF
    $("#regimenBtn").click(function(evt){
      $('#myModal').modal();
      $("#myModalLabel").html('Add New Activity');
      $(".modal-body").html('<form role="form" id="regimenForm"><div class="form-group"><input type="text" class="form-control" placeholder="Activity Name"></div><div class="form-group"><textarea class="form-control" rows="10" placeholder="Type the activity description here..."></textarea> </div></form>');
      $(".modal-footer").html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" data-dismiss="modal" id="saveActivity">Save Activity</button>');
      $('#saveActivity').on('click', function() {
        $('#myModal').modal('hide');
      });

    });

  
  //IGNORE
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
