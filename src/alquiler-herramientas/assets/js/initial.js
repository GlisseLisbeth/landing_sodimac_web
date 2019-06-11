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