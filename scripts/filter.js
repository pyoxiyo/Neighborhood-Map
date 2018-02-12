// class that creates marker objects
var Place = function(data) {
    this.name = data.name;
    this.position = data.position;
    this.marker = data.marker;
    this.infoWindow = data.infoWindow;
    this.wikiLink = data.wikiLink;
  };

var ViewModel = function() {
    var self = this; // store current this in a variable
    self.places = ko.observableArray(); 
    // push marker objects to places observable array
    data.forEach(function(place) {
        self.places.push(new Place(place));
    });
    // this is linked with the input element, its value is stored here
    self.filter = ko.observable('');
    // filtering function
    self.filteredItems = ko.computed(function() {
        var filter = self.filter().toLowerCase();
        // sets all markers to visible if there's no filter
        if (!filter) {
            ko.utils.arrayForEach(self.places(), function (place) {
            place.marker.setVisible(true);
        });
        return self.places();
        } else {
            // set all markers visiblilty to true if they match the filter
            // or false if they don't
            return ko.utils.arrayFilter(self.places(), function(place) {
                var result = (place.name.toLowerCase().search(filter) >= 0);
                place.marker.setVisible(result);
                return result;
            });
        }
    });
    // highlights the clicked on marker
    self.highlightMarker = function(clickedPlace) {
        highlight(clickedPlace.marker); // makes the clicked on marker orange and bouncy
        ajaxWiki(clickedPlace); // function that sets the name of the marker and wiki link to an infoWindow
    };
};