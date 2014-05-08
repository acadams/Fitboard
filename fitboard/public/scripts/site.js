var athletes = ["Steve Adams"];
var teams = ["Basketball"];

var NameList = ["Steve Adams", "Profound Assassin", "Eye B. Ballin", "Insane Bandit", "Supa Hot", "Rick James", "Dynamic Overlord", "Drunken Professional", "Lucky Pupil", "Intellectual Specialist", "Respected Watcher", "Wicked Worlock"];
var teamDisplayCounter = 1;
  

$(document).ready(function() {
  //first initialize all the saved shit
  //so regimen, injuries, notes, cal events


  
  
  //notes
  console.log(localStorage.getItem('notes'));
  if (localStorage.getItem('notes') == null) {
    var notesObj = {};
    notesObj = {
        "Add Weight": "Go up 5 lbs.",
        "Wednesday's Practice": "Just warm up and do a 10 minute jog.",
        "Protein Supplements": "The brand of supplements are NCAA approved.",
        "Updated Conditioning": "Instead of meeting at 4, we're meeting at 5."
      };
    localStorage.notes = JSON.stringify(notesObj);
  }

  //regimen
  if(localStorage.getItem('regimen') == null){
    var regObj={};
    regObj = {
      "Deep tissue massage": "Massage",
      "Foam rolling": "Rolling",
      "Ice bath": "Bath",
      "Yoga": "yoga"
    };
    localStorage.regimen= JSON.stringify(regObj);
  }

  if (localStorage.getItem('injuries') == null) {
    var injuriesObj = {};
    injuriesObj = {
      "Left Ankle": ["Sprained", "2 Weeks"],
      "Calf": ["Strained", "1-2 Weeks"]
    }
    localStorage.injuries = JSON.stringify(injuriesObj);
  }

  var notes=JSON.parse(localStorage.getItem('notes'));
  console.log(notes);
  //clear allnotes and update list 
  $('#allNotes').empty();
  for (var key in notes){
    console.log(notes[key]);
    $('#allNotes').append(
      $('<li>').attr({'class': 'list-group-item', 'data-title': key}).append(
        $('<a>').attr({ 'class': 'readNote', 'href':'#', 'data-description': notes[key], 'data-target': "#readModal", 'data-toggle': "modal"}).append(key))); 
  }

  var injuries = JSON.parse(localStorage.getItem('injuries'));
  $('#curInj').empty();
  for (var key in injuries) {
    var body = key;
    var type = injuries[key][0];
    var recovery = injuries[key][1];
    $('#curInj').append(
          $('<li>').attr({'class': 'list-group-item', 'data-body': body}).append(
            $('<a>').attr({ 'class': 'readInjury', 'data-target': "#readModal", 'data-toggle': "modal", 'href':'#', 'data-body': body, 'data-recovery': recovery, 'data-type': type}).append(type + ' ' + body + ' (' +recovery+ ')')));
    console.log('hey');
  }

  //clear allRegimens and update list
  var regs = JSON.parse(localStorage.getItem('regimen'));
  $('#allRegimens').empty();
  for (var key in regs){
    $('#allRegimens').append(
      $('<li>').attr({'class': 'list-group-item', 'data-title': key}).append(
        $('<a>').attr({ 'class': 'readReg', 'href':'#', 'data-description': regs[key], 'data-target': "#readModal", 'data-toggle': "modal"}).append(key)));
  }

  var viewableNotes = function() {
    $('.readNote').on('click', function() {
      var title = $(this).text();
      var desc = $(this).data('description');
      $('#readModal').modal();
      $('#noteReadForm').hide();
      $('#readModal').find('#readModalLabel').html($(this).text());
      $('#readModal').find('#noteDescription').html($(this).data('description'));

      $("#deleteBtn").click(function() {
        var result = confirm("Are you sure you want to delete this note?");

        if (result) {
            $('#readModal').modal('hide');
            console.log($('li[data-title="'+title+'"]'));
            //remove from view
            $('li[data-title="'+title+'"]').remove();
            //remove from "database"
            removeNoteFromLS(title);
            return false;
        }
      });

    });
  }

  viewableNotes();

  var viewableInjuries = function() {
    $('.readInjury').on('click', function() {
      var body = $(this).data('body');
      var recovery = $(this).data('recovery');
      var type = $(this).data('type');
      $('#readModal').modal();
      $('#noteReadForm').hide();
      $('#readModal').find('#readModalLabel').html("Current Injury");
      $('#readModal').find('#noteDescription').html(type + ' ' + body + ' (' +recovery+ ')');

      $("#deleteBtn").click(function() {
        var result = confirm("Are you sure you want to delete this injury report?");

        if (result) {
            $('#readModal').modal('hide');
            console.log($('li[data-title="'+title+'"]'));
            //remove from view
            $('li[data-body="'+body+'"]').remove();
            //remove from "database"
            removeInjuryFromLS(body);
            return false;
        }
      });

    });
  }

  viewableInjuries();

  var viewableRegItems = function() {
    $('.readReg').on('click', function() {
      var title = $(this).text();
      var desc = $(this).data('description');
      $('#readModal').modal();
      $('#noteReadForm').hide();
      $('#readModal').find('#readModalLabel').html($(this).text());
      $('#readModal').find('#noteDescription').html($(this).data('description'));

      $("#deleteBtn").click(function() {
        var result = confirm("Are you sure you want to delete this regimen item?");

        if (result) {
            $('#readModal').modal('hide');
            console.log($('li[data-title="'+title+'"]'));
            //remove from view
            $('li[data-title="'+title+'"]').remove();
            //remove from "database"
            removeRegFromLS(title);
            return false;
        }
      });

    });
  }

  viewableRegItems();

  var removeNoteFromLS = function(title) {
    notesObj = JSON.parse(localStorage.notes);
    delete notesObj[title];
    console.log('deleted! updated version:', notesObj);
    localStorage.notes = JSON.stringify(notesObj); 
  }

  var removeInjuryFromLS = function(body) {
    injuriesObj = JSON.parse(localStorage.injuries);
    delete injuriesObj[body];
    console.log('deleted! updated version:', injuriesObj);
    localStorage.injuries = JSON.stringify(injuriesObj); 
  }
  

  var removeRegFromLS = function(title) {
    regObj = JSON.parse(localStorage.regimen);
    delete regObj[title];
    console.log('deleted! updated version:', regObj);
    localStorage.regimen = JSON.stringify(regObj); 
  }
  //injuries

  

  


  //tabs for profile view
  $('.myTab').click(function (e) {
    e.preventDefault()
    $(this).tab('show');

  });
 

  $('#team').find('li').on('click', function() {
    $('#team').find('li').removeClass('active');
    $('.sportTeam').html('<h1>' + $(this).find('a').text() + '</h1>');
    $(this).addClass('active');
  });

  

//injury modal stuff
  $("#injuryBtn").click(function(evt) {
    $('#injModal').modal();
    $('#injModalLabel').html('Add New Injury Report');

  });

  $('#saveInjury').on('click', function() {
    //CHANGE
    var recovery = $('#recoveryInput').val();
    var body = $('#body').val();
    var type = $('#type').val();
    injuriesObj[body] = [type, recovery];
    localStorage.injuries = JSON.stringify(injuriesObj);
    $('#curInj').append(
      $('<li>').attr({'class': 'list-group-item', 'data-body': body}).append(
        $('<a>').attr({ 'class': 'readInjury', 'href':'#', 'data-target': "#readModal", 'data-toggle': "modal", 'data-body': body, 'data-recovery': recovery, 'data-type': type}).append(type + ' ' + body + ' (' +recovery+ ')')));

    $('#injModal').modal('hide');

    $('#recoveryInput').val('');
    $('#body').val('');
    $('#type').val('');
    viewableInjuries();
  });
    




  //NOTES MODAL STUFF

  $("#noteBtn").click(function(evt) {
    $("#saveItem").html('Save Note');
    $('#myModal').modal();
    $('#myModalLabel').html('Add New Note');
    // $('.modal-body').html('');
  });

  $('#saveItem').on('click', function() {
    var title = $('#noteSubj').val();
    var desc = $('#noteMess').val();
    console.log(notesObj[title]);
    if (notesObj[title] != "undefined") {
      notesObj[title] = desc;
    }
    localStorage.notes = JSON.stringify(notesObj);
    $('#allNotes').append(
      $('<li>').attr({'class': 'list-group-item', 'data-title': title}).append(
        $('<a>').attr({ 'class': 'readNote', 'href':'#', 'data-description': desc, 'data-target': "#readModal", 'data-toggle': "modal"}).append(title)));
    $('#myModal').modal('hide');
    title.val('');
    desc.val('');
    viewableNotes();
  });


  //Regimen Modal stuff
  $('#regimenBtn').click(function(evt){
    console.log("You clicked new regimen item!");
    $('#saveReg').html('Save Regimen');
    $('#regModal').modal();
    $('#regModalLabel').html('Add New Regimen');
    // $('.modal-body').html('');    
    });

  $('#saveReg').click(function(evt) {
      console.log("You clicked save item (regimen)");
      var title = $('#regSubj').val();
      var desc = $('#regMess').val();
      regObj= JSON.parse(localStorage.regimen);
      if (regObj[title] != "undefined") {
        regObj[title] = desc;
      }
      localStorage.regimen = JSON.stringify(regObj);
      $('#allRegimens').append(
      $('<li>').attr({'class': 'list-group-item', 'data-title': title}).append(
        $('<a>').attr({ 'class': 'readReg', 'href':'#', 'data-description': desc, 'data-target': "#readModal", 'data-toggle': "modal"}).append(title)));
      $('#regSubj').val('');
      $('#regMess').val('');
      $('#regModal').modal('hide');
      viewableRegItems();
  });

  
  // Injury Arrows: Clickable
  var addClickFunction = function() {
    $('#leftArrow').click(function (e) {
      e.preventDefault();
      console.log("left arrow clicked!");
      teamDisplayCounter--;
      if (teamDisplayCounter < 1) {
        teamDisplayCounter = 3;
      }
      changeDisplay();
    });

    $('#rightArrow').click(function (e) {
      e.preventDefault();
      console.log("right arrow clicked!");
      teamDisplayCounter++;
      if (teamDisplayCounter > 3) {
        teamDisplayCounter = 1;
      }
      changeDisplay();
    });
  };

  
  var changeDisplay = function() {
    console.log(teamDisplayCounter);

    var playerDisplay = $("#team");
    playerDisplay.width = $(document).width();
    playerDisplay.empty();
    // var htmlString = '';
    // var htmlLeft = '<li><button type="button" class="btn btn-default btn-lg" id="leftArrow"><span class="glyphicon glyphicon-chevron-left"></span></li>';
    // htmlString.concat(htmlLeft);


    var left = $('<li><button type="button" class="btn btn-default btn-lg" id="leftArrow"><span class="glyphicon glyphicon-chevron-left"></span></button></li>');

    playerDisplay.append(left);

    for (var i = 0; i < 4; i++) {
      var shift = ((teamDisplayCounter - 1) * 4) + i;
      console.log('shift', shift);
      
      var playerPic = $('<li style="width: 167px; height: auto"><a href="#"><center><img class="img-thumbnail picture"  src="../public/images/athlete '+ parseInt(shift+1) +'.png"></br>'+NameList[shift]+'</center></a></li>'); 
      playerDisplay.append(playerPic);     
      console.log(NameList[shift]);
    };
    var right = $('<li><button type="button" class="btn btn-default btn-lg" id="rightArrow"><span class="glyphicon glyphicon-chevron-right"></span></button></li>');

    playerDisplay.append(right);
    addClickFunction();
  };

  changeDisplay();
});
