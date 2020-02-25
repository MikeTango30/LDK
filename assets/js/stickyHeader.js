'use strict';
(function () {
    window.onscroll = function() {stickHeader()};

    let header = document.querySelector("nav");
    let sticky = header.offsetTop;

    function stickHeader() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
            header.classList.add("bg-bright");
            header.classList.remove("mt-3");
        } else {
            header.classList.remove("sticky");
            header.classList.add("bg-bright");
            header.classList.add("mt-3");
        }
    }
})();