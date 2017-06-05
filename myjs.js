$(document).ready(function(){
  var site = "https://api.wunderground.com/api/";
  var api = "ddc531071d3cbd75";
  var con1 = "/conditions/q/";
  var con2 = "/forecast/lang:BR/q/";
  var lat;
  var lon;
  var format = ".json";
  var url;
  
  $("#location").on("click", "#fahrenheitBtn", function() {
    $("#celciusBtn").removeClass("active");
    $("#fahrenheitBtn").addClass("active");
    $(".celcius").toggle();
    $(".fahrenheit").toggle();
  });
  
  $("#location").on("click", "#celciusBtn", function() {
    $("#celciusBtn").addClass("active");
    $("#fahrenheitBtn").removeClass("active");
    $(".celcius").toggle();
    $(".fahrenheit").toggle();
  });
  
  function drawWidget(divId,data) {
    $(divId).append("<p class='lead'>" + data.title + "</p>");
    $(divId).append("<img class='animated bounceIn' alt='" + data.fcttext_metric + "' src='" + data.icon_url + "'/>");
    $(divId).append("<p class='celcius'>" + data.fcttext_metric + "</p>");
    $(divId).append("<p class='fahrenheit'>" + data.fcttext + "</p>");
  };
  
  function insertJSON(todayDay, todayNight, tomorrowDay, tomorrowNight, afterTomorrowDay, afterTomorrowNight, afterTomorrowPlusOneDay, afterTomorrowPlusOneNight ) {
    //Today
    drawWidget("#todayDay", todayDay);
    drawWidget("#todayNight", todayNight);
    //Tomorrow
    drawWidget("#tomorrowDay", tomorrowDay);
    drawWidget("#tomorrowNight", tomorrowNight);
    //After tomorrow
    drawWidget("#afterTomorrowDay", afterTomorrowDay);
    drawWidget("#afterTomorrowNight", afterTomorrowNight);
    //After tomorrow plus one
    drawWidget("#afterTomorrowPlusOneDay", afterTomorrowPlusOneDay);
    drawWidget("#afterTomorrowPlusOneNight", afterTomorrowPlusOneNight);
  };
  
  function insertLocation(location) {
    $("#location").append("<h1>" + location.display_location.full + " <div class='btn-group btn-group-xs' role='group'><button type='button' id='celciusBtn' class='btn btn-default active'>Celcius</button><button type='button' id='fahrenheitBtn' class='btn btn-default scale'>Fahrenheit</button></div></h1>");
    $("#location").append("<h3>Latitude: " + location.display_location.latitude + " | Longitude: " + location.display_location.longitude + " | Altura: " + location.display_location.elevation +  "m</h3>");
  };
  
  function getWeather(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    url = site + api + con1 + lat + "," + lon + format;
    $.getJSON( url, function(json) {
      insertLocation(json.current_observation);
    });
    url = site + api + con2 + lat + "," + lon + format;
    $.getJSON( url, function(json) {
      insertJSON(json.forecast.txt_forecast.forecastday[0],json.forecast.txt_forecast.forecastday[1],json.forecast.txt_forecast.forecastday[2],json.forecast.txt_forecast.forecastday[3],json.forecast.txt_forecast.forecastday[4],json.forecast.txt_forecast.forecastday[5],json.forecast.txt_forecast.forecastday[6],json.forecast.txt_forecast.forecastday[7]);
    });
  };
  
  //get geolocation
  navigator.geolocation.getCurrentPosition(
    getWeather,
    function() {
      $("#coordDiv").html("Geolocation is not available");;
    });
});