  // Initial array of topics
  var topics = ["dog", "cat", "snake", "fish"];

    var topic = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + "dog" + "&apikey=eOejIy4du1HXE9xtGZ3ALUhhMUZZlmJl&limit=5";

   // Creating an AJAX call for the specific movie button being clicked
   $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // // Creating a div to hold the movie
    // var movieDiv = $("<div class='movie'>");

    // // Storing the rating data
    // var rating = response.Rated;

    // // Creating an element to have the rating displayed
    // var pOne = $("<p>").text("Rating: " + rating);

    // // Displaying the rating
    // movieDiv.append(pOne);

    // // Storing the release year
    // var released = response.Released;

    // // Creating an element to hold the release year
    // var pTwo = $("<p>").text("Released: " + released);

    // // Displaying the release year
    // movieDiv.append(pTwo);

    // // Storing the plot
    // var plot = response.Plot;

    // // Creating an element to hold the plot
    // var pThree = $("<p>").text("Plot: " + plot);

    // // Appending the plot
    // movieDiv.append(pThree);

    // // Retrieving the URL for the image
    // var imgURL = response.Poster;

    // // Creating an element to hold the image
    // var image = $("<img>").attr("src", imgURL);

    // // Appending the image
    // movieDiv.append(image);

    // // Putting the entire movie above the previous movies
    // $("#buttons-view").prepend(movieDiv);
  });







  // Function for displaying movie data
  function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("movie");
      // Adding a data-attribute with a value of the movie at index i
      a.attr("data-name", topics[i]);
      // Providing the button's text with a value of the movie at index i
      a.text(topics[i]);
      // Adding the button to the HTML
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where one button is clicked
  $("#add-topic").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var topic = $("#topic-input").val().trim();
    // The movie from the textbox is then added to our array
    topics.push(topic);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();