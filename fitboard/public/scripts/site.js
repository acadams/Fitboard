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

  // localStorage;

  //notes
  if (localStorage.getItem('notes') == "undefined") {
    var notesObj= {};
    notesObj.list = [{
        title: "Add Weight",
        description: "Go up 5 lbs."
      },
      {
        title: "Wednesday's Practice",
        description: "Just warm up and do a 10 minute jog."
      },
      {
        title: "Protein Supplements",
        description: "The brand of supplements are NCAA approved."
      },
      {
        title: "Updated Conditioning",
        description: "Instead of meeting at 4, we're meeting at 5."
      }];
    localStorage.notes = JSON.stringify(notesObj);
  }

  var notes=JSON.parse(localStorage.getItem('notes'));
  console.log(notes);
  //clear allnotes and update list 
  $('#allNotes').empty();
  for (var key in notes.list){
    console.log(notes.list[key]);
    $('#allNotes').append(
      $('<li>').attr('class', 'list-group-item').append(
        $('<a>').attr({ 'class': 'readNote', 'href':'#', 'data-description': notes.list[key].description, 'data-target': "#readModal", 'data-toggle': "modal"}).append(notes.list[key].title))); 
  }


  // var viewableNotes = function() {
  //   $('.readNote').on('click', function() {
  //     var title = $(this).text();
  //     var desc = $(this).data('description');
  //     $('#readModal').modal();
  //     $('#noteReadForm').hide();
  //     $('.modal-title').html(title);
  //     $('#readModal').find('#noteDescription').html(desc);

  //     $("#saveEditNote").click(function() {
  //       $(this).html('Save');
  //       if ($(this).data('saved') == false) {
  //         $(this).attr('data-saved', !($(this).data('saved')));
  //         $('#noteReadForm').show();
  //         $('#noteDescription').hide();
  //         $('#cancelBtn').css('display', 'inline-block');
  //         $('#cancelBtn').click(function() {
  //           $("#saveEditNote").html('Edit');
  //           console.log($(this));
  //           $(this).hide();
  //           $('#noteReadForm').hide();
  //           $('#noteDescription').show();
  //           $('#readModal').find('#noteDescription').html(desc);
  //         });
  //       } else {
  //         saveEditedNote($('#noteSubj').val(), $('#noteMess').val());
  //         //need to update local server, and the link data-description that's
  //         //on the page
  //       }       
  //     });

  //   });
  // }

  // viewableNotes();
  
  //injuries

  

  


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
      $('#injModal').modal();
      $('#injModalLabel').html('Add New Injury Report');

      $('#saveInjury').on('click', function() {

        $('#injModal').modal('hide');
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

  $("#noteBtn").click(function(evt) {
    $("#saveItem").html('Save Note');
    $('#myModal').modal();
    $('#myModalLabel').html('Add New Note');
    // $('.modal-body').html('');



    $('#saveItem').on('click', function() {
      var title = $('#noteSubj').val();
      var desc = $('#noteMess').val();
      notesObj.list.push({
        title: title,
        description: desc
      });
      localStorage.notes = JSON.stringify(notesObj);
      $('#allNotes').append(
        $('<li>').attr('class', 'list-group-item').append(
          $('<a>').attr({'href':'#', 'data-description': desc}).append(title)));
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
