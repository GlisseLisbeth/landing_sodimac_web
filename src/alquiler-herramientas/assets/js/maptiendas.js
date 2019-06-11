/* eslint-disable */
$(document).ready( function() {
  //window.load function initialize after of google.maps.event.addDomListener
  google.maps.event.addDomListener(window, 'load', initialize);
});
function initialize() {
    var lat = document.getElementById('map-latitude').value;
    var lon = document.getElementById('map-longitude').value;

    var tiendaLatLong = new google.maps.LatLng(lat, lon);
    var mapCanvas = document.getElementById('map-canvas');

    var mapOptions = {
        center: tiendaLatLong,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(mapCanvas, mapOptions);
}