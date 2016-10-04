/* Author: Brandon Martinez
* Date: 8/22/2016
* Description: Simple weather app uses jsonp to get a users coordinates from IP-API,
* then uses a json call with a proxy to get the weather from the OpenWeather API
*/

function getWeather(lat, lon) {

  var apiKey = "18a765675416a98edac4c8e0026a75d9";
  var URL = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&&appid=" + apiKey;

  // call open weather api using proxy
  $.getJSON(URL, function(json) {

    var city = json.name;
    var country = json.sys.country;
    var temperature = json.main.temp;
    var conditions = json.weather[0].main;
    var icon = json.weather[0].icon;

    $(".location").html(city + ", " + country);
    $(".temperature").html(temperature);
    $(".temp-symbol").html("&#8457");
    $(".conditions").html(conditions.toString());
    $(".conditions").append("<img class='icon' src=http://openweathermap.org/img/w/" + icon + ".png></img>");
  });
};

// On page load, get location data based on IP using ip-API
$.ajax({
  url: "http://ip-api.com/json",
  dataType: "jsonp",
  success: function(data) {
    var latitude = data.lat;
    var longitude = data.lon;
    getWeather(latitude, longitude);
  }
});

// Clicking the temperature changes to celsius
$(".temperature, .temp-symbol").click(function() {
  var temp = $(".temperature").text();
  var symbol = $(".temp-symbol").text();

  // compare temperature symbols to 
  // decide which way to do the conversion
  if (symbol.charCodeAt(0) === 8457) {
    temp = (temp - 32) * (5 / 9);
    $(".temperature").html(temp.toPrecision(4));
    $(".temp-symbol").html("&#8451");
 
} else if (symbol.charCodeAt(0) === 8451) {
  temp = (temp * (9 / 5)) + 32;
  $(".temperature").html(temp.toPrecision(4));
  $(".temp-symbol").html("&#8457");
}
});