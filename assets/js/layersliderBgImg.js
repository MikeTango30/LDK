'use strict';

(() => {
    const backgrounds = document.querySelectorAll('.ls-bg');
    backgrounds.forEach((background) => {
        background.style.width = '100%';
        background.style.height = 'auto';
    });
})();