'use strict';
(function () {
    /*---------------*/
    /* SWIPER SLIDER */
    /*---------------*/
    let swipers = {};
    let attrsToSize = {
        'data-md-slides' : '1023',
        'data-sm-slides' : '768',
        'data-xs-slides' : '599'
    };

    function parseSlidesAttrValue(value) {
        let parts = value.split(',');
        return {
            slidesPerView: parseInt(parts[0],10),
            spaceBetween: parseInt(parts[1],10)
        }
    }

    function createBreakpoints(container, attrsToSize) {
        let breakpointsObj = {};
        $.each(attrsToSize, function(key ,value) {
            if (container.attr(key)) {
                breakpointsObj[value] = parseSlidesAttrValue(container.attr(key));
            }
        });

        return breakpointsObj;
    }

    $('.swiper-container').each(function(index){
        let $t = $(this);
        let sliderIndex = 'swiper-unique-id-'+ index;
        $t.addClass(sliderIndex + ' initialized').attr('id', sliderIndex);
        $t.find('.swiper-pagination').addClass('pagination-'+ sliderIndex);

        let autoPlayVar = $t.attr('data-autoplay');
        let mode = $t.attr('data-mode');

        let loopVar = $t.attr('data-loop');
        let speedVar = parseInt($t.attr('data-speed'),10);
        let centerVar = $t.attr('data-center');
        let spaceBetweenVar = parseInt($t.attr('data-space-between'),10);
        let slideEffect = $t.attr('data-slide-effect');


        let slidesPerViewVar = parseInt($t.attr('data-slides-per-view'),10);
        if (isNaN(slidesPerViewVar)) {
            slidesPerViewVar = 'auto';
        }

        swipers[sliderIndex] = new Swiper('.' + sliderIndex,{
            loop: loopVar || false,
            autoplay: autoPlayVar || false,
            autoplayDisableOnInteraction: false,
            speed: speedVar || 300,
            slidesPerView: slidesPerViewVar || 1,
            spaceBetween: spaceBetweenVar,
            pagination: '.pagination-' + sliderIndex,
            paginationClickable: true,
            centeredSlides: centerVar || false,
            mode: mode || 'horizontal',
            grabCursor: true,
            keyboardControl: true,
            breakpoints: createBreakpoints($t, attrsToSize),
            setWrapperSize: true,
            effect: slideEffect || 'slide',
            fade: {
                crossFade: true
            }
        });
    });
})();