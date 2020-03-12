'use strict';

(() => {
    const xs = window.matchMedia('(min-width: 0px)');
    const sm = window.matchMedia('(min-width: 576px)');
    const md = window.matchMedia('(min-width: 768px)');
    const lg = window.matchMedia('(min-width: 992px)');
    const xl = window.matchMedia('(min-width: 1200px)');

    const defaultLayerOneWidth = document.querySelector('img.ls-l:nth-child(2)').width;
    const defaultLayerTwoWidth = document.querySelector('img.ls-l:nth-child(3)').width;
    // const slideText = document.querySelectorAll('.ls-wrapper');
    // console.log(slideText)


    //observe sticky header
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


    // adjustLayerslider();
    window.onresize = () => {
        adjustLayerslider();
    };

    function adjustLayerslider() {
        const layerslider = document.getElementById('layerslider');
        let fullHeight = document.querySelector('.full-height').clientHeight;
        let middleNavHeight = document.querySelector('.middle-nav').clientHeight;
        let headerHeight = document.querySelector('header').clientHeight;

        let layersliderHeight = fullHeight - middleNavHeight - headerHeight;
        let layerSize = adjustLayerSizeForBreakpoints(layersliderHeight);

        let firstLayers = document.querySelectorAll('img.ls-layer:nth-child(2)');
        let secondLayers = document.querySelectorAll('img.ls-layer:nth-child(3)');

        layerslider.style.height = `${layersliderHeight}px`;

        firstLayers.forEach((layer) => {
            layer.style.height = `${layerSize.layerHeight}px`;
            layer.style.width = `${layerSize.layerOneWidth}px`;
        });

        secondLayers.forEach((layer) => {
            layer.style.height = `${layerSize.layerHeight}px`;
            layer.style.width = `${layerSize.layerTwoWidth}px`;
        });
    }

    function adjustLayerSizeForBreakpoints(layersliderHeight) {
        let layerHeight = layersliderHeight;
        let layerOneWidth = defaultLayerOneWidth;
        let layerTwoWidth = defaultLayerTwoWidth;

        if (xs.matches) { // If media query matches
            layerHeight = layersliderHeight + 1100;
            layerOneWidth = defaultLayerOneWidth - 100;
            layerTwoWidth = defaultLayerTwoWidth - 100;
        }
        if (sm.matches) { // If media query matches
            layerHeight = layersliderHeight + 600;
            layerOneWidth = defaultLayerOneWidth - 200;
            layerTwoWidth = defaultLayerTwoWidth - 200;
        }
        if (md.matches) { // If media query matches
            layerHeight = layersliderHeight + 400;
            layerOneWidth = defaultLayerOneWidth - 250;
            layerTwoWidth = defaultLayerTwoWidth - 250;
        }
        if (lg.matches) { // If media query matches
            layerHeight = layersliderHeight + 200;
            layerOneWidth = defaultLayerOneWidth - 300;
            layerTwoWidth = defaultLayerTwoWidth - 300;
        }
        if (xl.matches) { // If media query matches
            layerOneWidth = defaultLayerOneWidth;
            layerTwoWidth = defaultLayerTwoWidth;
        }

        return {
            layerHeight: layerHeight,
            layerOneWidth: layerOneWidth,
            layerTwoWidth: layerTwoWidth
        };
    }
})();