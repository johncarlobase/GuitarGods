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
      div.addClass("card-mb4")
      div.addClass("card-header")
      $('.searchResult').html(" Search Results:")
      div.addClass("card-body")
      div.append("<p class='hideStat'>Rank: " + data.position + "</p>");
      div.append("<p class='hideStat'>Guitarist: " + data.guitarist + "</p>");
      div.append("<p class='hideStat'>Genre: " + data.genre + "</p>");
      div.append("<p class='hideStat'>Band: " + data.band + "</p>");
      div.append(`<input value=${data.position} type='number' class='editPosition' style='display: none;'>`);
      div.append(`<input value="${data.guitarist}" type='text' class='editGuitarist' style='display: none;'>`);
      div.append(`<input value="${data.genre}" type='text' class='editGenre' style='display: none;'>`);
      div.append(`<input value="${data.band}" type='text' class='editBand' style='display: none;'>`);
      div.append("<button class='delete' data-id='" + data.id + "'>DELETE PLAYER</button>");
      div.append("<button class='update' data-id='" + data.id + "'>UPDATE PLAYER</button>");
      div.append("<button class='cancel' style='display: none;' data-id='" + data.id + "'>CANCEL</button>");
      $(".cancel").hide();
      div.append("<button class='submit' style='display: none;' data-id='" + data.id + "'>SUBMIT</button>");
      $(".submit").hide();
      $("#stats").append(div);
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
      $(".update").click(function() {
        $("input.editPosition").show();
        $("input.editGuitarist").show();
        $("input.editGenre").show();
        $("input.editBand").show();
        $(".delete").hide();
        $(".update").hide();
        $(".cancel").show();
        $(".submit").show();
        $(".hideStat").hide();
      });
      $(".cancel").click(function() {
        $("input.editPosition").hide();
        $("input.editGuitarist").hide();
        $("input.editGenre").hide();
        $("input.editBand").hide();
        $(".delete").show();
        $(".update").show();
        $(".cancel").hide();
        $(".submit").hide();
        $(".hideStat").show();
      });
  
      $(".submit").click(function () {
        var editPlayer = {
          position: $(".editPosition").val().trim(),
          guitarist: $(".editGuitarist").val().trim(),
          genre: $(".editGenre").val().trim(),
          band: $(".editBand").val().trim()
        };
        $.ajax({
            method: "PUT",
            url: "/api/guitarist/id/" + $(this).attr("data-id"),
            data: editPlayer
          })
          // On success, run the following code
          .then(function () {
            console.log("Updated Successfully!");

            if (data) {
                $(".hide-alert").css("display", "block");
              }
          });
        $(this).closest("div").remove();
      });
    }
  };  //Document.Ready closing tag
  });
