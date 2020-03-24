
  $(document).ready(function () {
  console.log("ready!");

// Make a get request to our api route that will return every guitarist
$.get("/api/guitarist/", function(data) {
 
}).then(function(data){
 // For each book that our server sends us back
 console.log(data)
 renderAllGuitarist(data);

})
function renderAllGuitarist(data) {
  $("#stats").empty();
  $("#stats").show();

  var div = $("<div>");

  div.append("<h3>Guitarist: " + data.guitarist + "</h3p>");  
  div.append("<h4>Rank: " + data.position + "</h4>");

  div.append("<h4>Genre: " + data.genre + "</h4>");
  div.append("<h4>Band: " + data.band + "</h4>");


  $("#stats").append(div);




}






})