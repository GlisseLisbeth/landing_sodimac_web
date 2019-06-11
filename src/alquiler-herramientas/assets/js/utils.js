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
