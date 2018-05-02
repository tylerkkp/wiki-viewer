// create variable to hold random Wiki url
var randurl = 'https://en.wikipedia.org/wiki/Special:Random';
// set text of 'random article' link
document.getElementById('random').text = 'Random Article';
// add link to 'random article' link
document.getElementById('random').href = randurl;

// function to clear search box when 'clear' button is pressed
$(document).ready(function(){
    $("#clearbtn").click(function(){
        $("#searchbox").val("");
    });
});

var json;
$(document).ready(function(){
  $("#searchbtn").click(function() {
    var x = document.getElementById("searchbox").value;
    var searchurl = "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search="+x+"&limit=10&format=json&jsonp?";
    $.getJSON(searchurl,function(json){             document.getElementById("display-result").classList.add('bordered');
      $("#display-result").text("");
      $("#display-result").css("padding","1%");
      if(JSON.stringify(json[1])=="[]"){
          $("#display-result").append("<h3>No results found.</h3>");
        }
      else if(json.hasOwnProperty("error")){
        $("#display-result").append("<h3>Please enter a search term.</h3>");
      }
      else{
      for (var i=0;i<=9;i++){       
      $("#display-result").append("<a href="+JSON.stringify(json[3][i])+"target=\"_blank\">"+"<h3>"+JSON.stringify(json[1][i]).replace(/\"/g,"")+"</h3></a>");        
        $("#display-result").append(JSON.stringify(json[2][i]).replace(/\"/g,""));
        }
      }
        });
    });
  });

// function to activate the 'search' button with 'enter' keystroke
document.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("searchbtn").click();
  }
});