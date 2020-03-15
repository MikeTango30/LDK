'use strict';

(() => {
    // adjust layerslider to screen resizing;
    window.onresize = () => {
        adjustLayerslider();
    };

    // breakpoints
    const xs = window.matchMedia('(min-width: 0px)');
    const sm = window.matchMedia('(min-width: 576px)');
    const md = window.matchMedia('(min-width: 768px)');
    const lg = window.matchMedia('(min-width: 992px)');
    const xl = window.matchMedia('(min-width: 1200px)');
    const xxl = window.matchMedia('(min-width: 1681px)');

    // phone height breakpoints
    const heightXs = window.matchMedia('(min-height: 550px)');
    const heightSm = window.matchMedia('(min-height: 640px)');
    const heightMd = window.matchMedia('(min-height: 660px)');
    const heightXl = window.matchMedia('(min-height: 730px)');
    const heightXxl = window.matchMedia('(min-height: 810px)');

    // width in layerslider's initial html's inline styling
    const defaultLayerOneWidth = document.querySelector('img.ls-l:nth-child(2)').width;
    const defaultLayerTwoWidth = document.querySelector('img.ls-l:nth-child(3)').width;

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


    function adjustLayerslider() {
        const layerslider = document.getElementById('layerslider');
        let fullHeight = document.querySelector('.full-height').clientHeight;
        let middleNavHeight = document.querySelector('.middle-nav').clientHeight;
        let headerHeight = document.querySelector('header').clientHeight;
        let layersliderHeight = fullHeight - middleNavHeight - headerHeight;

        // adjust overlays for screen widths
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


        // adjust layer text position for common phone heights
        // WHY MAGIC NUMBERS: layerslider has limited ways for layer positioning and does shrink layers on resizing
        let layersliderText = document.querySelectorAll('h2.ls-layer');

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
                text.style.top = '105%';
                text.style.fontSize = '2.35rem';
            })
        }
        if (heightXxl.matches) {
            layersliderText.forEach(text => {
                text.style.left = '70px';
                text.style.top = '125%';
                text.style.fontSize = '2.5rem';
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
                text.style.left = '58px';
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
                text.style.left = '205px';
            })
        }
    }

    function adjustLayerSizeForBreakpoints(layersliderHeight) {
        let layerHeight = layersliderHeight;
        let layerOneWidth = defaultLayerOneWidth;
        let layerTwoWidth = defaultLayerTwoWidth;

        if (xs.matches) {
            layerHeight = layersliderHeight + 1100;
            layerOneWidth = defaultLayerOneWidth - 100;
            layerTwoWidth = defaultLayerTwoWidth - 100;
        }

        if (sm.matches) {
            layerHeight = layersliderHeight + 600;
            layerOneWidth = defaultLayerOneWidth - 200;
            layerTwoWidth = defaultLayerTwoWidth - 200;
        }

        if (md.matches) {
            layerHeight = layersliderHeight + 400;
            layerOneWidth = defaultLayerOneWidth - 250;
            layerTwoWidth = defaultLayerTwoWidth - 250;
        }
        if (lg.matches) {
            layerHeight = layersliderHeight + 200;
            layerOneWidth = defaultLayerOneWidth - 300;
            layerTwoWidth = defaultLayerTwoWidth - 300;
        }
        if (xl.matches) {
            layerHeight = layersliderHeight;
            layerOneWidth = defaultLayerOneWidth - 400;
            layerTwoWidth = defaultLayerTwoWidth - 400;
        }
        if (xxl.matches) {
            layerOneWidth = defaultLayerOneWidth - 200;
            layerTwoWidth = defaultLayerTwoWidth - 200;
        }

        return {
            layerHeight: layerHeight,
            layerOneWidth: layerOneWidth,
            layerTwoWidth: layerTwoWidth
        };
    }
})();