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
   $( "#menu-tools").load( "/static/categorias/contenidoEstatico/landings/alquiler_herramientas_prueba/menu.html?v=cntdrv8jry", function() {
       $( ".container-menu-main").load( "/static/categorias/contenidoEstatico/landings/alquiler_herramientas_prueba/frame-menu.html?v=cntdrv8jry", function() {
          
          categories.forEach(function (item) {
              $( ".container-menu-internal-"+item.container).load( "/static/categorias/contenidoEstatico/landings/alquiler_herramientas_prueba/menu-internal-" + item.url + ".html?v=cntdrv8jry", function() {
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
