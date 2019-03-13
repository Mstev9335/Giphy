// Initial array of animals
var topics = ["cat", "dog", "red panda", "goldfish", "skunk", "bird", "moose", "squirrel", "crab", "wombat"];

// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

  // stores the value of whichever button is clicked in animal
  var topic = $(this).attr("data-animal");

  //  using the animal variable to complete the queryURL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(response);

    // empty out the div so there aren't duplicates
    $('#gifs-appear-here').empty();

    // storing the data needed in the results variable
    var results = response.data;
    // ========================

    // for loop to loop through the animals array
    for (var i = 0; i < results.length; i++) {

      // create a new div
      var animalDiv = $("<div>");

      // store the gif's rating in a variable
      var rating = results[i].rating;

      // create new p tag to display the gif's rating
      var p = $("<p>").text("Rating: " + rating);

      // create new image tag to store the gif
      var animalImage = $("<img>");

      // get the still version of gif by default
      animalImage.attr("src", results[i].images.fixed_height_still.url);

      //  get the still version of the gif for the "data-still" attr
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);

      //  get the moving version of the gif for the "data-animate" attr
      animalImage.attr("data-animate", results[i].images.fixed_height.url);

      //  set the default data-state attr to "still"
      animalImage.attr("data-state", "still");

      //  add a class to the images
      animalImage.addClass("image");

      //  console.log(results[i].images.fixed_height.url);

      // add the p tag to the animalDiv
      animalDiv.append(p);

      // add the image to the animalDiv
      animalDiv.append(animalImage);

      // add the new div to the page
      $("#gifs-appear-here").prepend(animalDiv);
    }
  });

}

// renders the buttons on the page
function renderButtons() {

  //  clears out button div to avoid duplicates
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each animl in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of animal-btn to our button
    a.addClass("animal-btn");
    // Adding a data-attribute
    a.attr("data-animal", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where an animal button is clicked
$("#add-animal").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var topic = $("#animal-input").val().trim();

  // Adding animal from the textbox to our array
  topics.push(topic);

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

// click event listener for the gifs
$(document).on("click", ".image", function () {

  // store the state of the gif (still or animate ) in a variable
  var state = $(this).attr("data-state");
  // console.log(state);

  // if the state is still, change it to animate when clicked
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }

  // if the state is animate, change it to still when clicked
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});
