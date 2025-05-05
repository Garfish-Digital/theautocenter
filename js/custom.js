(function ($) {

    "use strict";

    // NAVBAR
    $('.navbar-collapse a').on('click', function () {
        $(".navbar-collapse").collapse('hide');
    });

    $(function () {
        $('.hero-slides').vegas({
            slides: [
                { src: 'images/slides/waterman_building.jpg' },
                { src: 'images/slides/outside_5.jpg' },
                { src: 'images/slides/tac_garage_outside.jpg' },
            ],
            timer: false,
            animation: 'kenburns',
            loop: false
        });
    });

    // CUSTOM LINK
    $('.smoothscroll').click(function () {
        var el = $(this).attr('href');
        var elWrapped = $(el);
        var header_height = $('.navbar').height() + 60;

        scrollToDiv(elWrapped, header_height);
        return false;

        function scrollToDiv(element, navheight) {
            var offset = element.offset();
            var offsetTop = offset.top;
            var totalScroll = offsetTop - navheight;

            $('body,html').animate({
                scrollTop: totalScroll
            }, 300);
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        flatpickr("#scheduling-form-date", {
            dateFormat: "Y-m-d", // Format for the value submitted to the server
            altInput: false, // Use the original input field
            minDate: "today", // Disable past dates
            disableMobile: true, // Force Flatpickr on mobile devices
        });
    });

})(window.jQuery);
