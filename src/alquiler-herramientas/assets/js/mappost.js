/* eslint-disable */
var initialLocation;
var markersArray = [];
var map;
var info = '';
var marker;
var selectProv = $('.select-prov');
var selectLimaCallao = $('.select-limcallao')
$(window).load( function() {
  var width = window.innerWidth || document.body.clientWidth || window.outerWidth;
  if(width < 1000) { 
    selectProv.text('Elige una tienda en provincias');
    selectLimaCallao.text('Elige una tienda en Lima y Callao');
  }
  else { 
     selectProv.text('Elige una tienda');
     selectLimaCallao.text('Elige una tienda');
  }
});

$(window).resize( function() {
  var width = window.innerWidth || document.body.clientWidth || window.outerWidth;
  if(width < 1000) { 
    selectProv.text('Elige una tienda en provincias');
    selectLimaCallao.text('Elige una tienda en Lima y Callao');
  }
  else { 
     selectProv.text('Elige una tienda');
     selectLimaCallao.text('Elige una tienda');
  }
});
$(document).ready(function() {
  selectLimaCallao.click(function (e) {
    e.preventDefault();
    var width = $(window).width();
    if(width < 1000) { 
      selectProv.text('Elige una tienda en provincias');
    }
    else { 
      selectProv.text('Elige una tienda');
    }
  });
  selectProv.click(function (e) {
    e.preventDefault();
    var width = $(window).width();
    if(width < 1000) { 
      selectLimaCallao.text('Elige una tienda en Lima y Callao');
    }
    else { 
       selectLimaCallao.text('Elige una tienda');
    }
  });
  $('.select-options li').click(function (e) {
    e.preventDefault();
    var textSelected = $(this).attr('rel');
    divInfoWindow(textSelected);
  });
  function divInfoWindow(text){
      var tiendaFilter = [];
      state.tiendas.forEach(function (tienda) {
          (tienda.nameAlias.indexOf(text) > -1 ) ? tiendaFilter.push(tienda): null;
      });
      info = '<div class="box-map-information text-center">'+
                '<div class="title-tienda col-md-12 col-xs-12 text-center bg-white">'+
                  '<p id="name-box-info-tienda" class="name-box-info-tienda">'+tiendaFilter[0].names+'</p>'+
                   '<p class="address-box-info-tienda text-center">'+tiendaFilter[0].address+', '+tiendaFilter[0].reference+'<p/>'+
                '</div>'+
                '<div class="box-container-info-hour col-md-12 col-sm-12 col-xs-12 bg-yellow">'+
                  '<p class="day-tools">L - V: &nbsp;&nbsp;'+ tiendaFilter[0].schedule +'</p>'+
                  '<p class="day-tools">S:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ tiendaFilter[0].scheduleWeekend +'</p>'+
                '</div>'+
              '</div>';
  
      setLocation(tiendaFilter[0].lat, tiendaFilter[0].long, info);
  }
  function setLocation(lat, lon, divInfo) {
    clearOverlays();
    var map = initializeMap();
    initialLocation = new google.maps.LatLng(lat, lon);
    var latCenter = lat - 2;
    var lonCenter = lon;
    var centerLocation = new google.maps.LatLng(latCenter, lonCenter);
    map.setCenter(centerLocation);
    var msg = '';
    if (divInfo != '') msg = divInfo.toString();
    addMarker(initialLocation, centerLocation, msg, map);
    marker.setIcon({ url: 'http://www.sodimac.com.pe/static/categorias/contenidoEstatico/masdesodimac/nuestras-tiendas/img/iconos/casa.png' });
    marker.addListener('click', function () {
      map.setZoom(15);
    });
  }
  function addMarker(location, centerLocation, msg, map) {
      marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Sodimac",
      zIndex: 2
    });
    markersArray.push(marker);
    map.setZoom(15);
    map.panTo(location);
    map.setCenter(centerLocation);
    addInfoWindow(marker, msg, map);
  }
  function addInfoWindow(marker, message, map) {
    var infoWindow = new google.maps.InfoWindow({
      content: message
    });
    google.maps.event.addListener(infoWindow, 'domready', function () {
      var iwOuter = $('.gm-style-iw');
      var dirOuter = $('.gm-style-pbc');
      var iwBackground = iwOuter.prev();
      var iwCloseBtn = iwOuter.next();
      var iwOuterMov = dirOuter.prev();
      iwBackground.children(':nth-child(2)').css({ 'display': 'none' });
      iwBackground.children(':nth-child(4)').css({ 'display': 'none' });
      iwOuter.parent().parent().css({ top: '30px', left: '-27x' });
      iwBackground.children(':nth-child(1)').attr('style', function (i, s) {
        return s + 'left: 76px !important;';
      });
      iwBackground.children(':nth-child(3)').attr('style', function (i, s) {
        return s + 'left: 76px !important;';
      });
      iwBackground.children(':nth-child(3)').find('div').children().css({ 'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index': '1' });
      iwCloseBtn.css({ display: 'none' });
      iwOuter.children(':nth-child(1)').children(':nth-child(1)').css({ overflow: 'hidden' });
      iwOuter.children(':nth-child(1)').css({ width: '100%' });
      iwOuter.children(':nth-child(1)').css({ height: 'auto' });
      iwBackground.children(':nth-child(3)').children(':nth-child(1)').css({ 'display': 'none' });
      iwBackground.children(':nth-child(3)').children(':nth-child(2)').css({ 'display': 'none' });
      iwBackground.children(':nth-child(1)').css({ 'display': 'none' });
      iwOuter.parent().addClass('arrow-map-down');
      iwOuterMov.css({ top: '60%' });
    });
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
      map.setZoom(17);
      map.panTo(marker.position);
    });
    infoWindow.open(map, marker);
  }
  function setMarkersMap(zoom) {
    map.zoom = zoom;
  }
  function initializeMap() {
    var lat = document.getElementById('map-latitude').value;
    var lon = document.getElementById('map-longitude').value;
  
    var tiendaLatLong = new google.maps.LatLng(lat, lon);
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
      center: tiendaLatLong,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
    map = new google.maps.Map(mapCanvas, mapOptions);
    return map;
  }
  function clearOverlays() {
    for (var i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);
    }
  }
});