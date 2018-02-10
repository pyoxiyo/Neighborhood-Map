var Loc = function(data) {
    this.name = data.name;
    this.position = data.position;
    this.marker = data.marker;
    this.infoWindow = data.infoWindow;
    this.wikiLink = data.wikiLink;
  };
  
var ViewModel = function() {
    var self = this;

    self.places = ko.observableArray();

    data.forEach(function(locItem) {
        self.places.push(new Loc(locItem));
    });

    self.filter = ko.observable('');

    self.filteredItems = ko.computed(function() {
        var filter = self.filter().toLowerCase();
        if (!filter) {
            ko.utils.arrayForEach(self.places(), function (item) {
            item.marker.setVisible(true);
        });
        return self.places();
        } else {
            return ko.utils.arrayFilter(self.places(), function(item) {
                // set all markers visible (false)
                var result = (item.name.toLowerCase().search(filter) >= 0);
                item.marker.setVisible(result);
                return result;
            });
        }
    });

    self.highlightMarker = function(clickedPlace) {
        highlight(clickedPlace.marker); // makes the clicked on marker orange and bouncy
        clickedPlace.infoWindow.setContent(clickedPlace.name + ajaxWiki(clickedPlace.wikiLink)); // puts the name and the wikipedia hyperlink in the info window
        clickedPlace.infoWindow.open(map, clickedPlace.marker); // shows the info window
    };
};