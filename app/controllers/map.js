var Map = require('ti.map');

var args = $.args;
var stations = args.data;
var annotations = [];

if (args.title) {
    $.map.title = args.title;
}

stations.forEach(function(station) {
    annotations.push(Map.createAnnotation({
        latitude: station.fields.position[0],
        longitude: station.fields.position[1],
        title: station.fields.name,
        subtitle: station.fields.available_bikes + ' disponibles sur ' + station.fields.available_bike_stands,
    }));
});

$.mapview.addEventListener('complete', function(e) {
    console.log('set region');
    console.log('parseFloat(args.userPosition.latitude)', parseFloat(args.userPosition.latitude));

    $.mapview.setRegion({
        // TODO Not working with user location, why ?
        latitude: 48.86504364013672,
        longitude: 2.374650001525879,
        animate:true,
        latitudeDelta:0.01,
        longitudeDelta:0.01
    });

    $.mapview.setAnnotations(annotations);
});
