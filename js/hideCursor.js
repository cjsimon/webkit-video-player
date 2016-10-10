// Hide the cursor after a given amount of time
$(function () {
    var timer;
    var fadeInBuffer = false;
    $(document).mousemove(function () {
        if (!fadeInBuffer) {
            if (timer) {
                clearTimeout(timer);
                timer = 0;
            }
            $('.fade-object').fadeIn();
            $('html').css({
                cursor: ''
            });
        } else {
            fadeInBuffer = false;
        }

        timer = setTimeout(function () {
            $('.fade-object').fadeOut();
            $('html').css({
                cursor: 'none'
            });
            fadeInBuffer = true;
        }, 1000);
    });
});
