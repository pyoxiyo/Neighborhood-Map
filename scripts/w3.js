var hamburger = $("#hamburger");
var sidebar = $("#sidebar");
var content = $("#main");
var hidden = true;
hamburger.click(function() {
    if (hidden === true) {
        content.css("margin-left", "25%");
        sidebar.css("display", "block");
        content.removeClass("m12");
        content.addClass("m9");
        hidden = false;
    } else if (hidden === false) {
        content.css("margin-left", "0");
        sidebar.css("display", "none");
        content.removeClass("m9");
        content.addClass("m12");
        hidden = true;
    }
});