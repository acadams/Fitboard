// Javascript for injury report page

// List of preloaded atheletes and teams to use in the computer prototype

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
	// When cancel button is clicked on a nwe injury report form,
	// the page automatically goes back to the injury report page on the 
	// athlete's profile

	$("#cancelInj").click(function(evt) {
		window.location.assign("injuryrep.html");
	});

	$("#injuryBtn").click(function(evt) {
		window.location.assign("newinjuryrep.html");
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
