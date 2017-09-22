//initial array of topics
var topics = ["basketball", "baseball", "tennis", "soccer", "hockey", "badminton", "swimming"];

//store api call with key into variable
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topics +
"&api_key=fc47a2c6d32841c38c08048e93f837b3&limit=10";
//var topicsButton = $("")

//for loop to create buttons

function renderButtons() {
    $("#sports-buttons").empty();
    
    for (var i = 0; i < topics.length; i++) {
           
            var a = $("<button>");
            a.attr("sports-data", topics[i]);
            console.log("topics " + topics[i]);
            a.text(topics[i]);
            a.attr("sport-name", topics[i]);
            a.addClass("sports");
            $("#sports-buttons").prepend(a);
  }
}

//click event for buttons
$("#sports-buttons").on("click", function(event) {
    //var sportClicked = $("sports-buttons").attr("sport-name");
       
      //console.log("sportclicked " + sportClicked);
        
        //var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sportClicked +
        //"&api_key=fc47a2c6d32841c38c08048e93f837b3&limit=10";
        event.preventDefault();
        

       $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          event.preventDefault();

          console.log('response: ',response);
          var results = response.data;
          console.log("results " + results);
         
         for (var i = 0; i < results.length; i++) {
          
          var imageUrl = response.data[i].images.fixed_height.url;
          var imageRating = response.data[i].rating;
          
          console.log("imagerating " + imageRating);
          console.log("imageurl " + imageUrl);
          
          var sportsImage = $("<img>");
          
          sportsImage.attr("src", imageUrl);
          sportsImage.attr("alt", "sport-image");

            var p = $("<p>").text("Rating: " + imageRating);
            var gifDiv = $("<div class='item'>");
            
            $("#sports-images").prepend(sportsImage);
            $("#sports-images").prepend(p);

        
        }
    }); 

      });

// This function handles events where one button is clicked
      $("#add-sports").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var newSport = $("#sports-input").val().trim();
        // The topic from the textbox is then added to our array
        topics.push(newSport);

        // calling renderButtons which handles the processing of our array
        renderButtons();
      });


$("img").on("click", function (state){
   
   $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          event.preventDefault();

  var result = response.data;


  for (var i = 0; i < result.length; i++) {
      var imgStill = response.data[i].images.fixed_height_still.url;
        console.log("imgStill " + imgStill)
      var imgAnimated = response.data[i].images.fixed_height.url;
        console.log("imganimated " + imgAnimated)

        $("img").click(function() {
          var state = $("img").attr("data-state");

          if ( state === "still") {
            $("img").attr({'data-state': 'animate'});
            $("img").attr("src", imgAnimated);
          } 
          else {
            $("img").attr({'data-state': 'still'});
            $("img").attr("src", imgStill);
          };
        });
      };
    });
  });

renderButtons();

state();

//api key fc47a2c6d32841c38c08048e93f837b3
//create on click event for buttons, still/stop(if statements, ajax call when clicking on the buttons
//create buttons from array, 