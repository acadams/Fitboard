if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to fitboard.";
  };

  Template.hello.michelle = function () {
    return "Michelle";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Meteor.startup(function () {
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
