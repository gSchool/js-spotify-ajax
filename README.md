# JS Spotify AJAX

## Objective
* Use the Spotify API to display albums by an artist, supplied through a input form.


1. First we need to grab the users input:

```javascript
// event handler for search form submission
$("form").on('submit', function (event){

  // prevent browser default behavior
  event.preventDefault();

  // grab tag from input
  var searchTerm = $("#search-term").val().trim();
  //The $.trim() function removes all newlines, spaces (including non-breaking spaces), and tabs from the beginning and end of the supplied string. If these whitespace characters occur in the middle of the string, they are preserved.

  console.log(searchTerm);
});
```

1. Next we need to make an AJAX request. The ajax() method is used to perform an AJAX (asynchronous HTTP) request. Reference the Spotify developers documentation
```javascript
function getAlbums(searchTerm) {
  var request = $.ajax({
    // where we are request data from
    url: "https://api.spotify.com/v1/search",
    // the http method to use for the request. we are asking(getting) for data. anytime you visit a website, you are making a GET request
    method: "GET",
    // data to be sent to the server
    data: {
      q: "artist:"+searchTerm,
      type: "album",
      limit: 18
    },
    // the type of data you are expecting back from the server
    dataType: "json",
  });
  request.done(function(response){
    console.log(response);
  });
};
```

1. Now we need to iterate through the returned data(JSON) and append the data to the dom.
```javascript
request.done(function(response){
  var albums = response.albums.items;
  var print = "";
  $.each(albums, function(i, album) {
    var albumName = album.name;
    var albumImage = album.images[1].url;
    var spotifyLink = album.external_urls.spotify;
    print += "<li class='result'><a href='" + spotifyLink + "' targer='_blank'><img src='" + albumImage +"' alt='" + albumName + "'><p class='caption'>"+ albumName +"</p></a></li>";
  });
  $(".results").html(print);
});
```
