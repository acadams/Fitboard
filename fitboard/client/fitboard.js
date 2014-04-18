if (Meteor.isClient) {
  Template.helloTemplate.greeting = function () {
    return "Welcome to fitboard.";
  };

  Template.helloTemplate.michelle = function () {
    return "Michelle";
  };

  Template.helloTemplate.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Meteor.startup(function () {
    


    //later we will want to dynamically add the pictures of the players in the sidebar. 
    for (var i=0; i < 4; i++) {
      $('#team').append('<li><a href="#"><center><img class="img-thumbnail picture"  src="/images/no_pic.png"></center></a></li>');

    }
  });
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
