/// When user clicks add-btn
$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // Make a newBook object

  var newPlayer = {
    position: $("#position")
      .val()
      .trim(),
    guitarist: $("#guitarist")
      .val()
      .trim(),
    genre: $("#genre")
      .val()
      .trim(),
    band: $("#band")
      .val()
      .trim()
  };

  // Send an AJAX POST-request with jQuery
  console.log(newPlayer);
  $.post("/api/guitarist", newPlayer)

    // On success, run the following code
    .then(function(data) {
      // Log the data we found
      console.log(data);

      if (data) {
        $(".hide-alert").css("display", "block");
      }
    });

  // Empty each input box by replacing the value with an empty string
  $("#position").val("");
  $("#guitarist").val("");
  $("#genre").val("");
  $("#band").val("");

  $("#exampleModal").modal("show");
});
