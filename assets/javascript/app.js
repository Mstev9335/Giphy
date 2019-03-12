// Initial array of movies
var animals = ["cat", "dog", "bird", "goldfish", "skunk"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

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
     console.log(results[i].images.fixed_height.url);

      animalDiv.append(p);
      animalDiv.append(animalImage);

      $("#gifs-appear-here").prepend(animalDiv);
}
  });

}

// renders the buttons on the page
function renderButtons() {

//  clears out button div to avoid duplicates
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each animl in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of animal-btn to our button
    a.addClass("animal-btn");
    // Adding a data-attribute
    a.attr("data-animal", animals[i]);
    // Providing the initial button text
    a.text(animals[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where an animal button is clicked
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding animal from the textbox to our array
  animals.push(animal);

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

  // click event to animate the gif
  $("#gifs-appear-here").on("click", function() {

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
