$(document).ready(function () {
  console.log("ready!");


   $('#find-gtr').on("click", function (event) {
    event.preventDefault();
    var inputGtr = $("#gtr-input").val().trim();
    console.log("This is the search result: " + inputGtr);
    

//lastFm API call to get Artist Name, Listeners, Playcount and Artist Bio
  $.ajax({
    type: 'POST',
    url: 'http://ws.audioscrobbler.com/2.0/',
    data: 'method=artist.getinfo&' +
      'artist='+inputGtr+'&' +
      'api_key=57ee3318536b23ee81d6b27e36997cde&' +
      'format=json',
    dataType: 'jsonp',
    success: function (data) {
      console.log(data)
      $('#success #artistName').html(data.artist.name);
      $("#stats").html(" Last FM Playback Stats")
      $('#success #artistListeners').html("The Number of Listeners is " + data.artist.stats.listeners);
      $('#success #artistPlaycount').html("The Artist Playcount is " + data.artist.stats.playcount);
      $("#bio").html("Guitarist Biography")
      $('#success #artistBio').html(data.artist.bio.content);
    },
    error: function (code, message) {
      $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
    }
  });
//lastFm API call to get the top five most popular tracks
  $.ajax({
    type: 'POST',
    url: 'http://ws.audioscrobbler.com/2.0/',
    data: 'method=artist.gettoptracks&' +
      'artist='+inputGtr+'&' +
      'api_key=57ee3318536b23ee81d6b27e36997cde&' +
      'format=json',
    dataType: 'jsonp',
    success: function (data) {
      $("#topTracks").html("Top Five Tracks")
      $('#success #topTrack1').html("The 1st Most Popular Track is " + data.toptracks.track[0].name + " with a playcount of " + data.toptracks.track[0].playcount + " and " + data.toptracks.track[0].listeners + " listeners");
      $('#success #topTrack2').html("The 2nd Most Popular Track is " + data.toptracks.track[1].name);
      $('#success #topTrack3').html("The 3rd Most Popular Track is " + data.toptracks.track[2].name);
      $('#success #topTrack4').html("The 4th Most Popular Track is " + data.toptracks.track[3].name);
      $('#success #topTrack5').html("The 5th Most Popular Track is " + data.toptracks.track[4].name);

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
    url: 'http://ws.audioscrobbler.com/2.0/',
    data: 'method=artist.gettopalbums&' +
      'artist='+inputGtr+'&' +
      'api_key=57ee3318536b23ee81d6b27e36997cde&' +
      'format=json',
    dataType: 'jsonp',
    success: function (data) {
      $("#topAlbums").html("Top Five Albums")
      $('#success #topAlbum1').html("The 1st Most Popular Album is " + data.topalbums.album[0].name);
      $('#success #topAlbum2').html("The 2nd Most Popular Album is " + data.topalbums.album[1].name);
      $('#success #topAlbum3').html("The 3rd Most Popular Album is " + data.topalbums.album[2].name);
      $('#success #topAlbum4').html("The 4th Most Popular Album is " + data.topalbums.album[3].name);
      $('#success #topAlbum5').html("The 5th Most Popular Album is " + data.topalbums.album[4].name);
      $('#success #topAlbum5img').html('<img src="' + data.topalbums.album[0].image[2]['#text'] + '" />');
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
    url : 'http://ws.audioscrobbler.com/2.0/',
    data : 'method=artist.getsimilar&' +
           'artist='+inputGtr+'&' +
           'api_key=57ee3318536b23ee81d6b27e36997cde&' +
           'format=json',
    dataType : 'jsonp',
    success : function(data) {
      $("#bands").html("Bands and Simlar Artists")
         $('#success #similar1').html("Other Bands The Guitarist Was In or Artists Associated with them are " 
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



})