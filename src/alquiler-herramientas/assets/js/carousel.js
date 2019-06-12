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
