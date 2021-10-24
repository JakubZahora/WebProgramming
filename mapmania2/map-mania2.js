

var gMap;
var markers = [];

var places = [];

var favoritePlaces = [
  {content:'Romeoville, IL! My hometown!', coordinates:{lat:41.64436,lng:-88.09073}, iconImagePath:"one.png"},
  {content:'Krakow, Poland', coordinates:{lat:50.0647,lng:19.9450}, iconImagePath:"flag.png"},
  {content:'Cancun, Mexico', coordinates:{lat:21.15523,lng:-86.85102}, iconImagePath:"flag.png"},
  {content:'Grand Canyon National Park', coordinates:{lat:36.09822,lng:-112.11055}, iconImagePath:"flag.png"},
  {content:'Tokyo, Japan', coordinates:{lat:35.67987, lng:139.76626}, iconImagePath:"flag.png"},
  {content:'Toronto, Canada', coordinates:{lat:43.64188,lng:-79.38752}, iconImagePath:"flag.png"},
  {content:'Berlin, Germany', coordinates:{lat:52.51476, lng:13.40128}, iconImagePath:"flag.png"},
  {content:'Italy, Rome', coordinates:{lat:41.87749, lng:12.49765}, iconImagePath:"flag.png"},
  {content:'Paris, France', coordinates:{lat:48.82835, lng:2.35453}, iconImagePath:"flag.png"},
  {content:'Zakopane, Poland', coordinates:{lat:49.2992,lng:19.9496}, iconImagePath:"flag.png"},
]; 

function initMap() {
  var modal = document.getElementById("myModal");
    var map= {
      center:new google.maps.LatLng(37.329351383453115, -40.822807597895746),
      zoom:4,
    };
    gMap = new google.maps.Map(document.getElementById("gMapID"),map);

    google.maps.event.addListener(gMap, 'idle', function() {
      updateGame()
    });
  modal.style.display = "block";
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function getLocation() {

}

function cheat() {
  console.log("Cheated!");
  for (var i=0; i < favoritePlaces.length; ++i) {
    var marker = new google.maps.Marker({position: favoritePlaces[i].coordinates, gMap, title: favoritePlaces[i].content, animation: google.maps.Animation.DROP});
    markers.push(marker);
    marker.setMap(gMap);
    SetScore();
  }
}


function updateGame() { 
  console.log('function UpdateGame() google-maps-step-03!');
  var zoomLevel = gMap.getZoom()
  var inBounds = false;

  // Check if Canoe Bay, WI is in the currently displayed map
  for (var i=0; i < favoritePlaces.length; ++i)
    if (gMap.getBounds().contains(favoritePlaces[0].coordinates)) {
        inBounds = true;
        if (inBounds == true) {
          if (zoomLevel < 8 && zoomLevel > 5) {
            SetHint("Warm");
            document.body.style.backgroundColor = "lightsalmon";
          } else if (zoomLevel >= 8 && zoomLevel < 10) {
            SetHint("Hot!")
            document.body.style.backgroundColor = "red"
          } else if (zoomLevel >= 10) {
            SetHint("Congratulations, you have found: " +favoritePlaces[0].content)
            document.body.style.backgroundColor = "wheat"
            var marker = new google.maps.Marker({position: favoritePlaces[0].coordinates, gMap, title: favoritePlaces[i].content, animation: google.maps.Animation.DROP});
            markers.push(marker);
            marker.setMap(gMap);
            favoritePlaces.splice(0, 1);
            gMap.setZoom(4);
          } else {
            document.body.style.backgroundColor = "wheat";
            SetHint("");
          }
        }
    } else if (inBounds == false){
      SetHint("Cold")
      document.body.style.backgroundColor = "cyan"
    } else if (favoritePlaces.length === 0) {
      break;
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
  if (fscore === 100) {
    document.body.style.backgroundColor = "wheat"
    document.getElementById("textBox").innerHTML = "Congratulations! You Won!"
  }
}