// Initial array of movies
var movies = ["cat", "dog", "bird", "goldfish"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

  var animal = $(this).attr("data-animal");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
console.log(response);
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
}
  });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("movie-btn");
    // Adding a data-attribute
    a.attr("data-animal", movies[i]);
    // Providing the initial button text
    a.text(movies[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();

  // Adding movie from the textbox to our array
  movies.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".movie-btn", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

  // click event to animate the gif
  // $(".gif").on("click", function() {

  //   var state = $(this).attr("data-state");

  //   if(state === "still") {
  //       $(this).attr("src", $(this).attr("data-animate"));
  //       $(this).attr("data-state", "animate");
  //       } 


  //   else {
  //         $(this).attr("src", $(this).attr("data-still"));
  //         $(this).attr("data-state", "still");
  //       } 

  // });
  //  ============================
