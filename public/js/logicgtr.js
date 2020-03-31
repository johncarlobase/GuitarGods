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
  $("#api-search-btn").on("click", function () {
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
  

//lastFm API call to get Artist Name, Listeners, Playcount and Artist Bio
$.ajax({
  type: 'POST',
  url: 'https://ws.audioscrobbler.com/2.0/',
  data: 'method=artist.getinfo&' +
    'artist='+inputGtr+'&' +
    'api_key=57ee3318536b23ee81d6b27e36997cde&' +
    'format=json',
  dataType: 'jsonp',
  success: function (data) {
    console.log(data)
    $('#success-lastfm #artistName').html(data.artist.name);
    $("#statsFM").html(" Last FM Playback Stats")
    $('#success-lastfm #artistListeners').html("The Number of Listeners is " + data.artist.stats.listeners);
    $('#success-lastfm #artistPlaycount').html("The Artist Playcount is " + data.artist.stats.playcount);
    $("#bio").html("Guitarist Biography")
    $('#success-lastfm #artistBio').html(data.artist.bio.content);
  },
  error: function (code, message) {
    $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
  }
});
//lastFm API call to get the top five most popular tracks
$.ajax({
  type: 'POST',
  url: 'https://ws.audioscrobbler.com/2.0/',
  data: 'method=artist.gettoptracks&' +
    'artist='+inputGtr+'&' +
    'api_key=57ee3318536b23ee81d6b27e36997cde&' +
    'format=json',
  dataType: 'jsonp',
  success: function (data) {
    $("#topTracks").html("Top Five Tracks")
    $('#success-lastfm #topTrack1').html("The 1st Most Popular Track is " + data.toptracks.track[0].name + " with a playcount of " + data.toptracks.track[0].playcount + " and " + data.toptracks.track[0].listeners + " listeners");
    $('#success-lastfm #topTrack2').html("The 2nd Most Popular Track is " + data.toptracks.track[1].name);
    $('#success-lastfm #topTrack3').html("The 3rd Most Popular Track is " + data.toptracks.track[2].name);
    $('#success-lastfm #topTrack4').html("The 4th Most Popular Track is " + data.toptracks.track[3].name);
    $('#success-lastfm #topTrack5').html("The 5th Most Popular Track is " + data.toptracks.track[4].name);

    console.log(data)
    console.log(data.toptracks.track[0].name);
    console.log("Most Popular Track is " + data.toptracks.track[0].name + " with a playcount of " + data.toptracks.track[0].playcount + " an " + data.toptracks.track[0].listeners + " listeners");


  },
  error: function (code, message) {
    $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
  }
});


//lastFm API call to get top five albums
$.ajax({
  type: 'POST',
  url: 'https://ws.audioscrobbler.com/2.0/',
  data: 'method=artist.gettopalbums&' +
    'artist='+inputGtr+'&' +
    'api_key=57ee3318536b23ee81d6b27e36997cde&' +
    'format=json',
  dataType: 'jsonp',
  success: function (data) {
    $("#topAlbums").html("Top Five Albums")
    $('#success-lastfm #topAlbum1').html("The 1st Most Popular Album is " + data.topalbums.album[0].name);
    $('#success-lastfm #topAlbum2').html("The 2nd Most Popular Album is " + data.topalbums.album[1].name);
    $('#success-lastfm #topAlbum3').html("The 3rd Most Popular Album is " + data.topalbums.album[2].name);
    $('#success-lastfm #topAlbum4').html("The 4th Most Popular Album is " + data.topalbums.album[3].name);
    $('#success-lastfm #topAlbum5').html("The 5th Most Popular Album is " + data.topalbums.album[4].name);
    $('#success-lastfm #topAlbum5img').html('<img src="' + data.topalbums.album[0].image[2]['#text'] + '" />');
    console.log(data)
    console.log(data.topalbums.album[0].name);
    console.log("Most Poplular Album is " + data.topalbums.album[0].name + " with a playcount of " + data.topalbums.album[0].playcount);
    console.log(data.topalbums.album[0].image[2]['#text'])
  },
  error: function (code, message) {
    $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
  }
});



$.ajax({
  type : 'POST',
  url : 'https://ws.audioscrobbler.com/2.0/',
  data : 'method=artist.getsimilar&' +
         'artist='+inputGtr+'&' +
         'api_key=57ee3318536b23ee81d6b27e36997cde&' +
         'format=json',
  dataType : 'jsonp',
  success : function(data) {
    if (data) {
        $(".hide-alert").css("display", "block");
      }
    $("#bands").html("Bands and Simlar Artists")
       $('#success-lastfm #similar1').html("Other Bands The Guitarist Was In or Artists Associated with them are: " 
       + data.similarartists.artist[0].name + ', '
       + data.similarartists.artist[1].name + ', '
       + data.similarartists.artist[2].name + ', '
       + data.similarartists.artist[3].name + ' and '
       + data.similarartists.artist[4].name)
   

      console.log(data)
      console.log(data.similarartists.artist[0].name);
      
  },
  error : function(code, message){
      $('#error').html('Error Code: ' + code + ', Error Message: ' + message);            
  }
});



});

