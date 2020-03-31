$(document).ready(function() {
  console.log("ready!");

  // Make a get request to our api route that will return every guitarist
  $.get("/api/guitarist/", function(data) {
    // For each book that our server sends us back
    console.log(data);
    // For each book that our server sends us back
    for (var i = 0; i < data.length; i++) {
      // Create a parent div to hold book data
      var wellSection = $("<div>");
      // Add a class to this div: 'well'
      wellSection.addClass("well");
      // Add an id to the well to mark which well it is
      wellSection.attr("id", "book-well-" + i);
      // Append the well to the well section
      $("#well-section").append(wellSection);

      // Now  we add our player data to the well we just placed on the page
      $("#book-well-" + i).append("<h5>" + data[i].position + "</h5>");
      $("#book-well-" + i).append("<h3>Player: " + data[i].guitarist + "</h4>");
      $("#book-well-" + i).append("<h3>Genre: " + data[i].genre + "</h4>");
      $("#book-well-" + i).append("<h3>Band: " + data[i].band + "</h4>");
      $("#book-well-" + i).append(`<input value="${data[i].position}" type='number' class='editPosition' style='display: none;'>`);
      $("#book-well-" + i).append(`<input value="${data[i].guitarist}" type='text' class='editGuitarist' style='display: none;'>`);
      $("#book-well-" + i).append(`<input value="${data[i].genre}" type='text' class='editGenre' style='display: none;'>`);
      $("#book-well-" + i).append(`<input value="${data[i].band}" type='text' class='editBand' style='display: none;'>`);
      $("#book-well-" + i).append("<button class='delete' data-id='" + data[i].id + "'>DELETE PLAYER</button>");
    }
    $(".delete").click(function () {
      if(confirm("Are you sure you want to delete?")) {
      $.ajax({
          method: "DELETE",
          url: "/api/guitarist/id/" + $(this).attr("data-id")
        })
        // On success, run the following code
        .then(function () {
          console.log("Deleted Successfully!");
        });
      $(this).closest("div").remove();
      }
      return false;
    });
  });
});
