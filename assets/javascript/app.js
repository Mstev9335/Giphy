$("button").on("click", function() {
  var animal = $(this).attr("data-animal");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // clears the gifs-appear-here div
    $('#gifs-appear-here').empty();
   
    var results = response.data;
    // ========================

    for (var i = 0; i < results.length; i++) {

      var animalDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

          var animalImage = $("<img>");
         animalImage.attr("src", results[i].images.fixed_height.url);

          animalDiv.append(p);
          animalDiv.append(animalImage);

          $("#gifs-appear-here").prepend(animalDiv);
        
    // ==================================
    }

  });

  // click event to animate the gif
  $(".gif").on("click", function() {

    var state = $(this).attr("data-state");

    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        } 


    else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        } 

  });
  //  ============================
});