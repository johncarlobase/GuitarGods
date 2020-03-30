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
  
  function renderGuitarist(data) {
    if (data.length !== 0) {

      $("#stats").show();

      var div = $("<div>");
      div.append("<h3>" + data.guitarist + "</h3>");
      div.append("<p>Rank: " + data.position + "</p>");
      div.append("<p>Genre: " + data.genre + "</p>");
      div.append("<p>Band: " + data.band + "</p>");
  
      $("#stats").append(div);
    }
  }

})
//***********************LAST FM CODE****************************************************************************************************************************************************** */
$('#find-gtr').on("click", function (event) {
  event.preventDefault();
  var inputGtr = $("#gtr-input").val().trim();
  console.log("This is the search result: " + inputGtr);
  

    var deezer = "";
    // "eric clapton"
    function buildQuery(term){
        if(term.includes(" ")) {
            term = term.split(' ').join("%20")
        }
        var result = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${term}`
        return result
        
    }

   console.log(buildQuery("eric clapton"))
    $.ajax({
        async: true,
        crossDomain: true,
        url: buildQuery(inputGtr),
        method: "GET",
        headers: {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "dfb87b0ec6msh548e75d6f762a4bp1dc2f1jsn322c78d86502"
        }
    }).done(function (response) {
           
   
        if (response) {
            $(".hide-alert").css("display", "block");
          }
          $("#success1").empty();
       
        $('#success #artistName').html("Artist Name is " + response.data[0]
            .artist.name);
        $('#success #artistId').html("Deezer Artist ID is " + response.data[0]
            .artist.id);

        $('#success #artistLink').html('Artist Link is: ' + "<a href=" +
            response.data[0].artist.link + ">" + response.data[0].artist
            .link + "</a>");
        $('#success #topAlbum5img').html('<img src="' + response.data[0].artist
            .picture_medium + '" />');
        $('#success #artistTracks').html('Artist tracklist is: ' + "<a href=" +
            response.data[0].artist.tracklist + ">" + response.data[0]
            .artist.tracklist + "</a>");
     
        deezer = (response.data)
        console.log(deezer)
        for (i = 0; i < deezer.length; i++) {
          
              
            $("#success1").show();
            var div = $("<div>");
            div.append("<hr>")
            div.append("<p>Song Title: " + response.data[i].title + "</p>");
            div.append("<p>Album Title: " + response.data[i].album.title +"</p>");
            div.append('<p>Song Preview ' + "<a href=" + response.data[i].preview + ">" + response.data[i].title + '</a>' + '</p>');
            div.append('<p> <img src="' + response.data[i].album.cover_medium + '" />' + '</p>');
            $("#success1").append(div);
          
        }

        //     $('#success #song').html("Song Title: " + response.data[i].title)
        //     $('#success #albumTitle').html("Album Title: " + response.data[i].album.title)
        //     $('#success #preview').html('Song Preview '+ "<a href=" + response.data[i].preview + ">" +  response.data[i].title+ "</a>");
        //     $('#success #album').html('<img src="' + response.data[i].album.cover_medium + '" />');

        console.log(response);
        //$("#success").empty();


    }) //response
//lastFm API call to get Artist Name, Listeners, Playcount and Artist Bio




});

