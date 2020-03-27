$(document).ready(function () {
  console.log("ready!");

  // When user hits the search-btn
  $("#search-btn").on("click", function (event) {
    event.preventDefault();

    // Save the guitarist rank they typed into the search input
    var rankSearch = $("#rank-search").val().trim();
    console.log("This is the search result: " + rankSearch);


    // Make an AJAX get request to our api, including the user's Guitarist  in the url
    $.get("/api/guitarist/position/" + rankSearch, function (data) {

    }).then(function (data) {
      if (data) {
        $("#stats").empty();
      }
      console.log(data)
      renderGuitarist(data);
    })

  });

  // When user hits the guitar-search-btn
  $("#guitar-search-btn").on("click", function () {
    event.preventDefault();

    // Save the author they typed into the author-search input
    var playerSearched = $("#guitar-search").val().trim();
    console.log("This is the search result: " + playerSearched);

    // Make an AJAX get request to our api, including the user's author in the url
    $.get("/api/guitarist/name/" + playerSearched, function (data) {
      if (data) {
        $("#stats").empty();
      }

      // Log the data to the console
      console.log(data);
      // Call our renderGuitarist function to add our Guitarists to the page
      renderGuitarist(data);

    });

  });

  // When user hits the genre-search-btn
  $("#band-search-btn").on("click", function () {
    event.preventDefault();

    // Save the band the user typed into the band input
    var bandSearch = $("#band-search").val().trim();
    console.log("This is the search result: " + bandSearch);

    // Make an AJAX get request to our api, including the band request in the url
    $.get("/api/guitarist/band/" + bandSearch, function (data) {

      if (data) {
        $("#stats").empty();
      }

      // Log the data to the console
      console.log(data)
      // Call our renderGuitarist function to add our Guitarists to the page

      return data.map(guitarist => {
        renderGuitarist(guitarist);
      })
    })


  });


  // When user hits the genre-search-btn
  $("#genre-search-btn").on("click", function () {
    event.preventDefault();

    // Save the band the user typed into the band input
    var genreSearch = $("#genre-search").val().trim();
    console.log("This is the search result: " + genreSearch);

    // Make an AJAX get request to our api, including the band request in the url
    $.get("/api/guitarist/genre/" + genreSearch, function (data) {

      if (data) {
        $("#stats").empty();
      }

      // Log the data to the console
      console.log(data)
      // Call our renderGuitarist function to add our Guitarists to the page

      return data.map(guitarist => {
        renderGuitarist(guitarist);
      })
    })


  });






  function renderGuitarist(data) {
    if (data.length !== 0) {
      $("#stats").show();
      var div = $("<div>");
      div.addClass("card")
      div.addClass("card-header")
      div.addClass("card-bodyDyn")
      div.append('searchResult').html(" Search Results:")
      div.append("<p>Rank: " + data.position + "</p>");
      div.append("<p>Guitarist: " + data.guitarist + "</p>");
      div.append("<p>Genre: " + data.genre + "</p>");
      div.append("<p>Band: " + data.band + "</p>");
      div.append("<button class='delete' data-id='" + data.id + "'>DELETE PLAYER</button>");
      $("#stats").append(div);
      $(".delete").click(function () {
        $.ajax({
            method: "DELETE",
            url: "/api/guitarist/id/" + $(this).attr("data-id")
          })
          // On success, run the following code
          .then(function () {
            console.log("Deleted Successfully!");
          });
        $(this).closest("div").remove();
      });
    }
  }





}) //Document.Ready closing tag

