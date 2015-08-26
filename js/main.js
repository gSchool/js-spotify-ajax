// add scripts

$(document).on('ready', function() {
  $('p').hide();
});

$("form").on("submit", function(event){
  event.preventDefault();
  var searchTerm = $("#search-term").val().trim();
  getResults(searchTerm);
  $('p').show();
});

function getResults(searchTerm) {
   var request = $.ajax({
    url: "https://api.spotify.com/v1/search",
    method: "GET",
    data: {
      q: "artist:"+searchTerm,
      type: "album",
      limit: 5
    },
    dataType: "json",
  });

  results.done(function(response) {
    var albums = response.albums.items;
    var display = ""
    $.each(albums, function(i, album){
      var albumName = album.name;
      var albumImage = album.images[0].url;
      var spotifyLink = album.external_urls.spotify;
      display += "<li><img src=" + albumImage + "></li>";
    });
    $('.results').html(display);
  });

  results.fail(function(error) {
    alert("Something went wrong!");
  })
};
