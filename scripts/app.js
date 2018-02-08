// visual stuff
var hamburger = $("#hamburger");
var sidebar = $("#sidebar");
var content = $("#main");
var hidden = true;
hamburger.click(function() {
    if (hidden == true) {
        content.css("margin-left", "25%")
        sidebar.css("display", "block");
        content.removeClass("m12");
        content.addClass("m9")
        hidden = false;
    } else if (hidden == false) {
        content.css("margin-left", "0")
        sidebar.css("display", "none");
        content.removeClass("m9");
        content.addClass("m12")
        hidden = true;
    }
});
//  this is the code

// Filter

// places array for the sidebar
var places = [{name:"The University of Sydney", id:0}, {name:"Powerhouse Museum", id:1}, {name:"Darling Harbour", id:2},
{name:"Sydney Cricket & Sports Ground Trust", id:3}, {name:"Mrs Macquarie's Chair", id:4}];

// using knockout.js
function ViewModel(){
    var self =this;
    this.filter = ko.observable();
    this.places = ko.observableArray(places);
    this.visiblePlaces = ko.computed(function(){
        return this.places().filter(function(place){
            if(!self.filter() || place.name.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1)
                return place;
        });
    },this)
  };
  ko.applyBindings( new ViewModel);

// Map
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    // Sydney lat long
    center: {lat: -33.875944, lng: 151.201456},
    zoom: 14
    });

    // Gets all the marker lat longs and titles for the info window
    var data = [
        ["The University of Sydney ", {lat: -33.888558, lng: 151.187308}],
        ["Powerhouse Museum ", {lat: -33.878506, lng: 151.199566}],
        ["Darling Harbour ", {lat: -33.874879, lng: 151.200899}],
        ["Sydney Cricket & Sports Ground Trust ", {lat: -33.891521, lng: 151.224847}],
        ["Mrs Macquarie's Chair ", {lat: -33.859654, lng: 151.222534}]
    ];
    // declare the infoWindow
    var infoWindow = new google.maps.InfoWindow();
    // Store the markers here
    markers = [];
    // Loops through the data array to get the parameters for the markers
    for(var i = 0; i < data.length; i++) { 
        var marker = new google.maps.Marker({
            position: data[i][1],
            map: map,
            title: data[i][0],
            animation: google.maps.Animation.DROP
        });
        // Stores each marker
        markers.push(marker);
        // ajax for the wikipedia links
        var ajaxWiki = function(w) {
            $.ajax({
                url: w,
                dataType: "jsonp",
                success: function(response) {
                    var article = response[1][0];
                    var url = "http://en.wikipedia.org/wiki/" + article;
                    $('.gm-style-iw').append("<br><span><a href='" + url + "' target='_blank'>" + article + "</a></span>") ;
                    }
            })
        }
        // Listens for click events to set the content of the info Window
        // and open it. Also makes the marker bounce

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function () {
                // this function is for the bounce animation
                bounce(this);
                // the link to the api
                var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&search="
                + data[i][0] + "&format=json&callback=wikiCallback";
                infoWindow.setContent(data[i][0] + ajaxWiki(wikiUrl));
                // infoTitle.push(infoWindow);
                infoWindow.open(map, marker);
            }
            // the idea of using the IFFE was taken from stack overflow.
            // https://stackoverflow.com/questions/32798480/assign-infowindow-for-each-marker-in-google-maps
        })(marker, i));
        // YOU WERE HERE ------------------------------------------------------------------ YOU WERE HERE ------------
        $('#side-links').attr('id', i).click((function(marker, i) {
            return function () {
                // this function is for the bounce animation
                bounce(markers[i]);
                // the link to the api
                var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&search="
                + data[i][0] + "&format=json&callback=wikiCallback";
                infoWindow.setContent(data[i][0] + ajaxWiki(wikiUrl));
                // infoTitle.push(infoWindow);
                infoWindow.open(map, marker);               
            }
        })(marker, i));

    }
    function bounce(e) {
        // Sets each markers animation state to null so that only the
        // marker that is currently clicked on gets to bounce
        for(var i = 0; i < markers.length; i++) {
            markers[i].setAnimation(null);
        }
        // Makes the clicked on marker bounce
        e.setAnimation(google.maps.Animation.BOUNCE);
    }

    
}