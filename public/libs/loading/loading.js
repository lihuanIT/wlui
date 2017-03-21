'use strict';

window.Loading = {

    loadingbar: function(direction) {
        if ($("#loadingbar").length === 0) {
            $("body").append("<div id='loadingbar' class='" + direction + "'></div>");
            $("#loadingbar").addClass("waiting").append($("<dt/><dd/>"));
            $('body').append('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');

            switch (direction) {
                case 'right':
                    $("#loadingbar").width((50 + Math.random() * 30) + "%");
                    break;
                case 'left':
                    $("#loadingbar").addClass("left").animate({
                        right: 0,
                        left: 100 - (50 + Math.random() * 30) + "%"
                    }, 200);
                    break;
                case 'down':
                    $("#loadingbar").addClass("down").animate({
                        left: 0,
                        height: (50 + Math.random() * 30) + "%"
                    }, 200);
                    break;
                case 'up':
                    $("#loadingbar").addClass("up").animate({
                        left: 0,
                        top: 100 - (50 + Math.random() * 30) + "%"
                    }, 200);
                    break;
            }
        }
    },

    unloadingbar: function(direction) {
        switch (direction) {
            case 'right':
                $("#loadingbar").width("101%").delay(200).fadeOut(400, function() {
                    $(this).remove();
                });
                break;
            case 'left':
                $("#loadingbar").css("left", "0").delay(200).fadeOut(400, function() {
                    $(this).remove();
                });
                break;
            case 'down':
                $("#loadingbar").height("101%").delay(200).fadeOut(400, function() {
                    $(this).remove();
                });
                break;
            case 'up':
                $("#loadingbar").css("top", "0").delay(200).fadeOut(400, function() {
                    $(this).remove();
                });
                break;
        }

        $('#loading-bar-spinner').remove();
    },

    show: function() {
        this.loadingbar("right");
    },

    hide: function() {
        this.unloadingbar("right");
    }

}
