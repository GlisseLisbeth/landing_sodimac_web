/* eslint-disable */
$(document).ready(function(){
  $('.slider-drag-tools').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    fade: true,
    ccssEase: 'linear',
    arrows: true,
    autoplaySpeed: 4000,
    autoplay:true,
    vertical: false,
    infinite: true,
    responsive: [{
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
            autoplay:true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          autoplay:true
        }
      }
    ]
  });

  var blazy = new Blazy({ 
  });


  $('.slider-drag-tools').on('afterChange', function(_event, slick){
    blazy.revalidate();
  });
});

/* eslint-disable */
let lastScrollTop = 0;

( function() {
    jQuery(document).ready(function () {
        if (! $('body').hasClass('sope-hire-tools')) {
            $('body').addClass('sope-hire-tools');
        }
        $('.collapse').on('show.bs.collapse', function() {
            console.log("abierto");

            $(this).siblings('div').find('i').removeClass('fa fa-plus');
            $(this).siblings('div').find('i').addClass('fa fa-minus');
        })
        $('.collapse').on('hide.bs.collapse', function() {
            $(this).siblings('div').find('i').removeClass('fa fa-minus');
            $(this).siblings('div').find('i').addClass('fa fa-plus');
        })
    });
    jQuery(document).scroll( function() {
        let currentScroll = window.pageYOffset || document.body.scrollTop;
        if(lastScrollTop >= 19)
        {   $('.newHeader #navBarHover>spam').css('display', 'none');
            $('.main-nav').css('backgroundColor', 'transparent');
        }
        else{
            $('.newHeader #navBarHover>spam').css('display', 'block');
            $('.main-nav').css('backgroundColor', '#fff');
        }
        lastScrollTop = currentScroll;
    });
})(jQuery)
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
/* eslint-disable */
$('.select-opc-1').each(function(){
    
    var $this = $(this), numberOfOptions = $(this).children('option').length;
    var divSelected = '';
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled select-limcallao"></div>');
    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

$('.select-opc-2').each(function(){
    
    var $this = $(this), numberOfOptions = $(this).children('option').length;
    var divSelected = '';
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled select-prov"></div>');
    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});
/* eslint-disable */
var categories = [
  {
    url: 'obra-gruesa',
    container: 'obra',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1700001/ObraGruesa-Perforacion-Demolicion?cid=ctghoc11990',
    cid: 'ctghoc11990',
    firstSC: 'alisadora'
  },
  {
    url: 'maquinaria',
    container: 'maquinarias',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1700002/Maquinaria-de-carga-Andamios-Escaleras?cid=ctghoc11991',
    cid: 'ctghoc11991',
    firstSC: 'minicargador'
  },
  {
    url: 'contenedores',
    container: 'contenedores',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1700007/Contenedores-Banos?cid=ctghoc11989',
    cid: 'ctghoc11989',
    firstSC: 'banos-quimicos-construccion'
  },
  {
    url: 'electricidad',
    container: 'electricidad',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1700005/Electricidad-Iluminacion?cid=ctghoc11994',
    cid: 'ctghoc11994',
    firstSC: 'extensiones'
  },
  {
    url: 'jardineria',
    container: 'jardineria',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1700003/Jardineria-y-Forestal?cid=ctghoc11993',
    cid: 'ctghoc11993',
    firstSC: 'motosierra'
  },
  {
    url: 'herramientas',
    container: 'herramientas',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1700004/Herramientas-inalambricas?cid=ctghoc11995',
    cid: 'ctghoc11995',
    firstSC: 'atornillador'
  },
  {
    url: 'aseo',
    container: 'aseo',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1700009/Aseo?cid=ctghoc11992',
    cid: 'ctghoc11992',
    firstSC: 'aspiradoras'
  },
  {
    url: 'carpinteria',
    container: 'carpinteria',
    address: 'http://www.sodimac.com.pe/sodimac-pe/content/a1700008/Carpinteria-Construccion-Acabados?cid=ctghoc11988',
    cid: 'ctghoc11988',
    firstSC: 'fresadora'
  }
];

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


$(document).ready(function() {
  // Get url (without query params), cid param and sc param
  var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');
  var cidCat = getParameterByName('cid', location.href);
  var activeSubCat = getParameterByName('sc', location.href);
  localStorage.setItem("cid", cidCat);
  localStorage.setItem("sc", activeSubCat);
  function checkIfComingFromOtherCategory() {
    // If there is a category and a subcategory, make it active
    if(cidCat !== null && activeSubCat !== null ){
      if (activeSubCat !== "" && typeof subCategoria[activeSubCat] !== undefined) {
        changeActiveSubCategory(activeSubCat);
      } 
    }
  }
  // Make subcategory active
  /** @var subCat string
  *   @var $elem jQuery object
  */
  function changeActiveSubCategory(subCat, $elem) {
    $('#title-subcat-responsive').html('+ ' + subCat.toUpperCase());
    if ( subCat === 'banos') {
      $('#title-subcat-responsive').html('+ BAÑOS');
    }
    if ( subCat === 'duchas-y-caseta-de-vigilancia') {
      $('#title-subcat-responsive').html('+ DUCHAS Y CASETA DE VIGILANCIA');
    }
    if ( subCat === 'banos-quimicos-construccion') {
      $('#title-subcat-responsive').html('+ BAÑOS QUÍMICOS CONSTRUCCIÓN');
    }
    if ( subCat === 'banos-quimicos-evento') {
      $('#title-subcat-responsive').html('+ BAÑOS QUÍMICOS EVENTO');
    }
    if ( subCat === 'pistola-drywall') {
      $('#title-subcat-responsive').html('+ PISTOLA DRYWALL');
    }
    if ( subCat === 'soldadora-inversora') {
      $('#title-subcat-responsive').html('+ SOLDADORA INVERSORA');
    }
    if ( subCat === 'limpiadores-tapices') {
      $('#title-subcat-responsive').html('+ LIMPIADORES TAPICES');
    }
    if ( subCat === 'limpiadores-a-vapor') {
      $('#title-subcat-responsive').html('+ LIMPIADORES A VAPOR');
    }
    if ( subCat === 'motoguadanas') {
      $('#title-subcat-responsive').html('+ MOTOGUADAÑAS');
    }
    showProduct(subCategoria[subCat]);
    if (!$elem) {
      $('.link-menu[data-subcat="' + subCat + '"]').addClass('active-subCat');
    } else {
      $elem.addClass('active-subCat');
    }
  }
  $(document).on('click', '.link-menu', function() {
    var $this = $(this),
    clickedUrl = $this.attr('href'),
    clickedSubCat = $this.data('subcat');
    var clickedId = localStorage.getItem('cid');
   
    // If clicked category is the same change active subcategory
    // otherwise go to new cat with subcat url
    if (clickedUrl === currentUrl || clickedUrl === "#") { // # For desktop
      changeActiveSubCategory(clickedSubCat, $this);
      if (clickedUrl !== "#") {
        // Hide all modals on mobile
        var modal = $('div.modal.in').modal('hide');
      }
      history.pushState(null, "", [location.protocol, '//', location.host, location.pathname].join('') + '?cid=' + clickedId + '&sc=' + clickedSubCat);
      
    } else {
      window.location.href = $this.attr('href') + '&sc=' + clickedSubCat;
    }
    return false;
  });

  $(document).on('click', '.link-menu-cat', function() {
      var $this = $(this),
      clickedUrl = $this.attr('href');
      categories.forEach(function (item) {
        (item.address.indexOf(clickedUrl) > -1 ) ? clickedSubCat = item.firstSC : null ; 
      });
      // If clicked category is the same change active subcategory
      // otherwise go to new cat with subcat url
      if (clickedUrl === currentUrl || clickedUrl === "#") { // # For desktop
        if (clickedUrl !== "#") {
          // Hide all modals on mobile
          var modal = $('div.modal.in').modal('hide');
        }
      } else {
          location.href = $this.attr('href') + '&sc=' + clickedSubCat;
      }
      return false;
});
  // insert menu main and get menu for each category
   $( "#menu-tools").load( "menu.html", function() {
       $( ".container-menu-main").load( "frame-menu.html", function() {
          
          categories.forEach(function (item) {
              $( ".container-menu-internal-"+item.container).load( "menu-internal-" + item.url + ".html", function() {
                  var cidCat = localStorage.getItem('cid');
                  var activeSubCat = localStorage.getItem('sc');
                  if(cidCat !== null && activeSubCat !== null ){
                    if (activeSubCat !== "") {
                      $('.link-menu[data-subcat="' + activeSubCat + '"]').addClass('active-subCat');
                    } 
                  }
              });
          });

          jQuery('img.svg').each(function() {
          var $img = jQuery(this);
          var imgID = $img.attr('id');
          var imgClass = $img.attr('class');
          var imgURL = $img.attr('src');

          jQuery.get(imgURL, function(data) {
            var $svg = jQuery(data).find('svg');

            if (typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
            }
            if (typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            $svg = $svg.removeAttr('xmlns:a');

            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
              $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            $img.replaceWith($svg);

          }, 'xml');
        }); 
       });
  });
  checkIfComingFromOtherCategory();
});

/* eslint-disable */
function showProduct(array) {
    $('.link-menu').removeClass('active-subCat');
    $('.sideboard').empty();

  array.forEach(function(element, index) {
    var divProducto = $('<div class="row bg-white padding-12">');
    var contImgProduct = $('<div class="col-md-7 position-img">');
    var imgProducto = $('<img src="' + element.imagenProduct + '" class="img-product" width="300" height="200" />');
    var contDescriptionProduct = $('<div class="col-md-5 box-product-padd"  >');
    var titleProduct = $('<div class="col-md-12 col-xs-12 product-title">' + element.nombre + '</div>');
    var contDetail = $(' <div class="col-md-12 col-xs-6 product-description">');
    var skuProduct = $('<span> SKU : ' + element.SKU + '</span>');
    var contPriceProduct = $('<div class="col-md-12 col-xs-6 product-price">');
    var textTarifa = $('<span>Tarifa de Alquiler/Día completo</span>');
    var tarifaProduct = $(' <span class="product-price-desc"><span class="small-price-desc">S/</span> ' + element.Tarifa + '.<span class="small-price-desc">00</span></span>');
    divProducto.append(contImgProduct)
    contImgProduct.append(imgProducto);
    divProducto.append(contDescriptionProduct);
    contDescriptionProduct.append(titleProduct);
    contDescriptionProduct.append(contDetail);
    contDetail.append(skuProduct);
    for (var i = 4; i < Object.keys(element).length; i++) {
      var detailProduct = $('<span>' + Object.keys(element)[i] + ' : ' + element[Object.keys(element)[i]] + '</span>');
      contDetail.append(detailProduct);
    }
    contDescriptionProduct.append(contPriceProduct);
    contPriceProduct.append(textTarifa);
    contPriceProduct.append(tarifaProduct);
    $('.sideboard').append(divProducto);
    var spaceDiv = $('<div class="space-product"></div>');
    $('.sideboard').append(spaceDiv);
  });
}
