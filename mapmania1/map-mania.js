var gMap;
var markers = [];

var favoritePlaces = [
  {content:'<strong>#1: Lombard, IL... Home Sweet Home!<strong>', coordinates:{lat:41.837546,lng:-88.0146821}, iconImagePath:"one.png"},
  {content:'<strong>#2: Quetico!<strong>', coordinates:{lat:48.5,lng:-91.3}, iconImagePath:"two.png"},
  {content:'Santorini, Greece', coordinates:{lat:36.3932,lng:25.4615}, iconImagePath:"flag.png"},
  {content:'Florence, Italy', coordinates:{lat:43.7696,lng:11.2558}, iconImagePath:"flag.png"},
  {content:'Myrtle Beach, SC', coordinates:{lat:33.6891,lng:-78.8867}, iconImagePath:"flag.png"},
  {content:'Prague, Czechia', coordinates:{lat:50.0755,lng:14.4378}, iconImagePath:"flag.png"},
  {content:'Nelson, New Zealand', coordinates:{lat:-41.2706,lng:173.2840}, iconImagePath:"flag.png"},
  {content:'Krakow, Poland', coordinates:{lat:50.0647,lng:19.9450}, iconImagePath:"flag.png"},
  {content:'Zakopane, Poland', coordinates:{lat:49.2992,lng:19.9496}, iconImagePath:"flag.png"},
  {content:'Canoe Bay, WI', coordinates:{lat:45.3306,lng:-91.4918}, iconImagePath:"flag.png"}
]; 

function initMap() {
    var map= {
      center:new google.maps.LatLng(37.329351383453115, -40.822807597895746),
      zoom:4,
    };
    gMap = new google.maps.Map(document.getElementById("gMapID"),map);

    google.maps.event.addListener(gMap, 'idle', function() {
      updateGame()
    });
}



function updateGame() {
  console.log('function UpdateGame() google-maps-step-03!');
  var zoomLevel = gMap.getZoom()
  var inBounds = false;

  // Check if Canoe Bay, WI is in the currently displayed map
  for (var i=0; i < favoritePlaces.length; ++i)
    if (gMap.getBounds().contains(favoritePlaces[i].coordinates)) {
        inBounds = true;
        if (inBounds == true) {
          SetHint("Warm")
          document.body.style.backgroundColor = "lightsalmon"
          if (zoomLevel < 8 && zoomLevel > 5) {
            SetHint("Warmer...")
            document.body.style.backgroundColor = "orangered"
          } else if (zoomLevel >= 8 && zoomLevel < 10) {
            SetHint("HOT HOT HOT")
            document.body.style.backgroundColor = "red"
          } else if (zoomLevel >= 10) {
            SetHint("Congratulations, you have found: " +favoritePlaces[i].content)
            document.body.style.backgroundColor = "wheat"
            var marker = new google.maps.Marker({position: favoritePlaces[i].coordinates, gMap, title: favoritePlaces[i].content});
            markers.push(marker);
            marker.setMap(gMap);
          }
        }
    } else if (inBounds == false){
      SetHint("Cold")
      document.body.style.backgroundColor = "cyan"
    }
  console.log("inBounds:"+inBounds+" zoomLevel:"+zoomLevel);
  SetScore();
}

function SetHint(hint) {
  document.getElementById("hint-id").value = hint;  
}

function SetScore() {
  var fscore = 0;
  var marknum = markers.length;
  fscore = marknum * 10;
  document.getElementById("score-id").value = fscore; 
}