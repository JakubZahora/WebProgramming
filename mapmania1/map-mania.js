function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(37.329351383453115, -40.822807597895746),
      zoom:4,
    };
    var map = new google.maps.Map(document.getElementById("gMapID"),mapProp);
}