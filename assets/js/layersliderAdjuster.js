'use strict';

(() => {
    // adjust layerslider to screen resizing;
    window.onresize = () => {
        adjustLayerslider();
    };

    // breakpoints
    const md = window.matchMedia('(min-width: 768px)');

    // account for sticky header
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

    // add text to layerslider nav buttons
    $('#layerslider').on('sliderDidLoad', function() {
        let textStrings = [
            'Vienijame smulkų ir vidutinį <br> verslą Lietuvoje',
            'Atstovaujame SVV įmonių interesus  <br> Lietuvoje ir užsienyje',
            'Skatiname SVV įmonių socialinę <br> atsakomybę ir darbo vietų kūrimą',
            'Esame nuolatos matomi ir girdimi <br> žiniasklaidoje'
        ];

        let lsNavButtons = document.querySelector('.ls-bottom-slidebuttons').childNodes;
        // lsNavButtons.forEach(button => {
        //     button.setAttribute('style', 'width: 5px !important');
        //     button.setAttribute('style', 'height: 5px !important');
        // })
        let i = 0;

        lsNavButtons.forEach(button => {
            let text = document.createElement('h2');
            // apply style
            text.style.position = 'absolute';
            text.style.top = '-35px';
            text.style.width = '600px';
            text.style.left = '5px';
            text.style.color = '#fff';
            text.style.fontSize = '24px';
            text.style.fontFamily = 'Open Sans';
            text.style.fontWeight = '600';
            text.style.textTransform = 'uppercase';

            text.innerHTML = textStrings[i];
            text.classList.toggle('d-none');
            text.classList.add('custom-text-slide');
            button.appendChild(text);
            i++;

            // show first slide text
            if (button.classList.contains('ls-nav-active')) {
                text.classList.toggle('d-none');
            }
        });

        // toggle text on slide change
        $('#layerslider').on('slideChangeWillComplete', function () {
            let lsNavButtons = document.querySelector('.ls-bottom-slidebuttons').childNodes;
            lsNavButtons.forEach(button => {
                if (button.classList.contains('ls-nav-active')) {
                    button.firstChild.classList.toggle('d-none');
                    if (button.nextSibling) {
                        button.nextSibling.firstChild.classList.toggle('d-none');
                    } else {
                        lsNavButtons[0].firstChild.classList.toggle('d-none');
                    }
                }
            })
        });
    });

    function adjustLayerslider() {
        const layerslider = document.getElementById('layerslider');
        let fullHeight = document.querySelector('.full-height').clientHeight;
        let middleNavHeight = document.querySelector('.middle-nav').clientHeight;
        let headerHeight = document.querySelector('header').clientHeight;

        // adjust layerslider height
        let layersliderHeight = fullHeight - middleNavHeight - headerHeight;
        layerslider.style.height = `${layersliderHeight}px`;

        // overlays position
        let firstLayers = document.querySelectorAll('img.ls-layer:nth-child(2)');
        let secondLayers = document.querySelectorAll('img.ls-layer:nth-child(3)');

        firstLayers.forEach((layer) => {
            layer.style.height = `100%`;
            layer.style.width = `120%`;
            if (md.matches) {
                firstLayers.forEach(layer => {
                        layer.style.height = `100%`;
                        layer.style.width = `95%`;
                    });
                }
        });
        secondLayers.forEach((layer) => {
            layer.style.height = `100%`;
            layer.style.width = `110%`;
            if (md.matches) {
                secondLayers.forEach(layer => {
                    layer.style.height = `100%`;
                    layer.style.width = `85%`;
                })
            }
        });
    }
})();