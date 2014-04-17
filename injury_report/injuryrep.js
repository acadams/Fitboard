// Javascript for injury report page

// List of preloaded atheletes and teams to use in the computer prototype

var athletes= ["Steve A."];
var teams= ["Basketball"];

$(document).ready(function() {
	// When cancel button is clicked on a nwe injury report form,
	// the page automatically goes back to the injury report page on the 
	// athlete's profile

	$("#cancelInj").click(function(evt) {
		window.location.assign("injuryrep.html");
	});

	$("#injuryBtn").click(function(evt) {
		window.location.assign("newinjuryrep.html");
	});

	// When submit button is clicked on new injury report form,
	// all of the details from the form should appear in the athlete's 
	// injury page
	$("#submitInj").click(function(evt) {
		// Extract information from the text fields and ouptut into 
		// the injury page
		var type= document.getElementById("type");
		var body= document.getElementById("body");
		var time= document.getElementById("time");
		var rec= document.getElementById("rec");
		var info= [type.value, body.value, time.value, rec.value];
		type.value="";
		body.value="";
		time.value="";
		rec.value="";
		var tempEle= document.createElement("LI");
		var str= info[0]+" "+info[1]+" ("+info[3]+")";
		var text= document.createTextNode(str);
		tempEle.appendChild(text);
		submitClick=true;
		window.location.replace("injuryrep.html");
	});
});
