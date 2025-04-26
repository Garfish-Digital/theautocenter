
(function ($) {

    "use strict";

    // NAVBAR
    $('.navbar-collapse a').on('click', function () {
        $(".navbar-collapse").collapse('hide');
    });

    $(function () {
        $('.hero-slides').vegas({
            slides: [
                //   { src: 'images/slides/sincere-laugh-showing-picture-smartphone-casual-meeting-with-best-friends-restaurant-terrace.jpg' },
                //   { src: 'images/happy-waitress-giving-coffee-customers-while-serving-them-coffee-shop.jpg' },
                //   { src: 'images/young-female-barista-wear-face-mask-serving-take-away-hot-coffee-paper-cup-consumer-cafe.jpg' },
                { src: 'images/slides/waterman_building.jpg' },
                { src: 'images/slides/outside_5.jpg' },
                { src: 'images/slides/tac_garage_outside.jpg' },
            ],
            timer: false,
            animation: 'kenburns',
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

    // document.addEventListener("DOMContentLoaded", function () {
    //     flatpickr("#booking-form-date", {
    //         dateFormat: "Y-m-d", // Customize the date format (e.g., YYYY-MM-DD)
    //         allowInput: true, // Allow manual input if needed
    //         altInput: true, // Show a more user-friendly date format
    //         altFormat: "F j, Y", // Format for the displayed date (e.g., January 1, 2025)
    //         minDate: "today", // Disable past dates
    //         disableMobile: false, // Ensures Flatpickr is used even on mobile devices

    //         onReady: function (selectedDates, dateStr, instance) {
    //             instance.altInput.setAttribute("placeholder", "Select a date"); // Set placeholder for altInput
    //         }
    //     });
    // });

    document.addEventListener("DOMContentLoaded", function () {
        flatpickr("#booking-form-date", {
            dateFormat: "Y-m-d", // Format for the value submitted to the server
            altInput: false, // Use the original input field
            minDate: "today", // Disable past dates
            disableMobile: true, // Force Flatpickr on mobile devices
        });
    });

})(window.jQuery);
