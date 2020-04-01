'use strict';

(() => {
    // adjust layerslider to screen resizing;
    window.onresize = () => {
        adjustLayerslider();
    };

    // breakpoints
    // const xs = window.matchMedia('(min-width: 0px)');
    // const sm = window.matchMedia('(min-width: 576px)');
    const md = window.matchMedia('(min-width: 768px)');
    const xl = window.matchMedia('(min-width: 1200px)');
    const lg = window.matchMedia('(min-width: 992px)');
    const xxl = window.matchMedia('(min-width: 1680px)');
    const xxxl = window.matchMedia('(min-width: 1920px)');

    // phone height breakpoints
    const heightXs = window.matchMedia('(min-height: 550px)');
    const heightSm = window.matchMedia('(min-height: 640px)');
    const heightMd = window.matchMedia('(min-height: 660px)');
    const heightXl = window.matchMedia('(min-height: 730px)');
    const heightXxl = window.matchMedia('(min-height: 810px)');

    //account for sticky header
    const nav = document.querySelector('nav');
    const config = {attributes: true};
    const callback = function (mutationsList, observer) {
        let fullHeight = document.querySelector('.full-height');
        const layersliderHeight = document.getElementById('layerslider').clientHeight;
        let middleNavHeight = document.querySelector('.middle-nav').clientHeight;
        const headerHeight = document.querySelector('header').clientHeight;
        let newFullHeight = layersliderHeight + middleNavHeight + headerHeight;

        for (let mutation of mutationsList) {
            mutation.target.classList.contains('sticky') ? fullHeight.style.height = `${newFullHeight}px`
                : fullHeight.style.height = '100vh';
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(nav, config);

    // try calc correct text position: distance from left
    // $('#layerslider').on('sliderDidLoad', function(event, slider) {
    //     // let screenWidth =  document.body.clientWidth > 1920 ? 1920 :document.body.clientWidth;
    //     // const currentContainerWidth = document.querySelector('.container').clientWidth;
    //     // let textPositionLeft = (screenWidth - currentContainerWidth)/2;
    //
    //     let layersliderText = document.querySelectorAll('h2.ls-layer');
    //
    //     layersliderText.forEach(text => {
    //         text.style.top = '90%';
    //     })
    // });

    function adjustLayerslider() {
        const layerslider = document.getElementById('layerslider');
        let fullHeight = document.querySelector('.full-height').clientHeight;
        let middleNavHeight = document.querySelector('.middle-nav').clientHeight;
        let headerHeight = document.querySelector('header').clientHeight;

        // adjust layers for screen widths
        // layerslider height
        let layersliderHeight = fullHeight - middleNavHeight - headerHeight;
        layerslider.style.height = `${layersliderHeight}px`;

        //overlays position
        let firstLayers = document.querySelectorAll('img.ls-layer:nth-child(2)');
        let secondLayers = document.querySelectorAll('img.ls-layer:nth-child(3)');
        firstLayers.forEach((layer) => {
            layer.style.height = `100%`;
            layer.style.width = `95%`;
        });
        secondLayers.forEach((layer) => {
            layer.style.height = `100%`;
            layer.style.width = `85%`;
        });

        // text position
        adjustTextPositionForBreakpoints();
    }

    function adjustTextPositionForBreakpoints() {
        // adjust layer text position for common phone heights
        // WHY MAGIC NUMBERS: layerslider has limited ways for layer positioning and does shrink layers on resizing
        let layersliderText = document.querySelectorAll('h2.ls-layer');

        // adjust acording to screen height - mobile
        if (heightXs.matches) {
            layersliderText.forEach(text => {
                text.style.left = '85px';
                text.style.top = '85%';
                text.style.fontSize = '1.9rem';
            })
        }
        if (heightSm.matches) {
            layersliderText.forEach(text => {
                text.style.left = '70px';
                text.style.top = '95%';
                text.style.fontSize = '2.25rem';
            })
        }
        if (heightMd.matches) {
            layersliderText.forEach(text => {
                text.style.left = '70px';
                text.style.top = '95%';
                text.style.fontSize = '2.25rem';
            })
        }
        if (heightXl.matches) {
            layersliderText.forEach(text => {
                text.style.left = '70px';
                text.style.top = '110%';
                text.style.fontSize = '1.85rem';
            })
        }
        if (heightXxl.matches) {
            layersliderText.forEach(text => {
                text.style.left = '70px';
                text.style.top = '140%';
                text.style.fontSize = '1.85rem';
            })
        }

        // adjust text position according to screen width
        if (md.matches) {
            layersliderText.forEach(text => {
                text.style.left = '67px';
                text.style.top = '113%';
                text.style.fontSize = '2rem';
                text.style.height = '15%';
            })
        }
        if (lg.matches) {
            layersliderText.forEach(text => {
                // text.style.left = '48px';
                text.style.top = '140%';
                text.style.fontSize = '2rem';
            })
        }
        if (xl.matches) {
            layersliderText.forEach(text => {
                text.style.left = '100px';
                text.style.top = '85%';
                text.style.fontSize = '24px';
            })
        }
        if (xxl.matches) {
            layersliderText.forEach(text => {
                text.style.left = '55px';
                text.style.top = '85%';
                text.style.fontSize = '24px';
            })
        }
        if (xxxl.matches) {
            layersliderText.forEach(text => {
                text.style.left = '205px';
                text.style.top = '90%';
            })
        }
    }
})();