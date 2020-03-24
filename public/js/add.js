
// When user clicks add-btn
$("#add-btn").on("click", function(event) {
    event.preventDefault();
  
    // Make a newBook object
    var newPlayer = {
      position: $("#position").val().trim(),
      player: $("#player").val().trim(),
      genre: $("#genre").val().trim(),
      band: $("#band").val().trim()
    };
  
    // Send an AJAX POST-request with jQuery
    $.post("/api/new", newPlayer)
      // On success, run the following code
      .then(function(data) {
        // Log the data we found
        console.log(data);
      });
  
    // Empty each input box by replacing the value with an empty string
    $("#position").val("");
    $("#player").val("");
    $("#genre").val("");
    $("#band").val("");
  
  });
  