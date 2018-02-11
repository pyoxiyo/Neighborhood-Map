var hamburger = $("#hamburger");
var sidebar = $("#sidebar");
var content = $("#main");
var hidden = true;
hamburger.click(function() {
    if (hidden === true) {
        content.css("margin-left", "25%");
        hamburger.addClass("hamburger-mobile");
        $('.big-text-mobile').css("font-size", "1.9em");
        sidebar.css("display", "block");
        content.removeClass("m12");
        content.addClass("m9");
        hidden = false;
    } else if (hidden === false) {
        content.css("margin-left", "0");
        hamburger.removeClass("hamburger-mobile");
        $('.big-text-mobile').css("font-size", "2.1em");
        sidebar.css("display", "none");
        content.removeClass("m9");
        content.addClass("m12");
        hidden = true;
    }
});