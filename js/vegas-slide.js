(function ($) {

    "use strict";

    // NAVBAR
    $('.navbar-collapse a').on('click', function () {
        $(".navbar-collapse").collapse('hide');
    });

    $(function () {
        $('.hero-slides').vegas({
            slides: [
                { src: 'images/slides/building-oldest-waterman.jpg' },
                { src: 'images/slides/building-waterman.jpg' },
                { src: 'images/slides/building-the-auto-center.jpg' },
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

})(window.jQuery);
