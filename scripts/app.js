// this is where all the data is pulled from
var data = [
    {name: "The University of Sydney ", position: {lat: -33.888558, lng: 151.187308}},
    {name: "Powerhouse Museum ", position: {lat: -33.878506, lng: 151.199566}},
    {name: "Darling Harbour ", position: {lat: -33.874879, lng: 151.200899}},
    {name: "Sydney Cricket & Sports Ground Trust ", position: {lat: -33.891521, lng: 151.224847}},
    {name: "Mrs Macquarie's Chair ", position: {lat: -33.859654, lng: 151.222534}}
];

// Map
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    // Sydney lat long
    center: {lat: -33.875944, lng: 151.201456},
    zoom: 14
    });

    // declare the infoWindow
    var infoWindow = new google.maps.InfoWindow();

    // Creates the markers, and store them along side the info windows and the wikipedia
    for(var i = 0; i < data.length; i++) {
        var marker = new google.maps.Marker({
            position: data[i].position,
            map: map,
            title: data[i].name,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            animation: google.maps.Animation.DROP
        });
        // Stores each marker, info window and wikipedia link in the data array
        data[i].marker = marker;
        data[i].infoWindow = infoWindow;
        data[i].wikiLink = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + data[i].name + "&format=json&callback=wikiCallback";

    }

    // adds an event listener for each marker
    data.forEach(function(loc){
        loc.marker.addListener('click', function(){
            highlight(this); // makes the clicked on marker orange and bouncy
            // puts the name and the wikipedia hyperlink in the info window
            loc.infoWindow.setContent(loc.name + ajaxWiki(loc.wikiLink)); // this ajax function is declared below
            loc.infoWindow.open(map, loc.marker); // shows the info window
        });
    });
    // activates knockout.js
    ko.applyBindings( new ViewModel());
    }

// function that gives the marker bouncieness and orangeness
function highlight(marker) {
    for(var i = 0; i < data.length; i++) {
        data[i].marker.setAnimation(null); // removes animation from each marker
        data[i].marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'); // Sets each markers color to yellow
    }
    marker.setAnimation(google.maps.Animation.BOUNCE); // Makes the clicked on marker bounce
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/orange-dot.png'); // Makes the clicked on marker orange
}

// AJAX for the wikipedia links
var ajaxWiki = function(w) {
    $.ajax({
        url: w,
        dataType: "jsonp",
        success: function(response) {
            var article = response[1][0];
            var url = "http://en.wikipedia.org/wiki/" + article;
            var wikiLink = "<br><span><a href='" + url + "' target='_blank'>" + article + "</a></span>";
            $('.gm-style-iw').append(wikiLink);
            }
    });
};