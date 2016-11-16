// Init
var listItems = [];
var jsonResponse = null;
var userPosition = null;

var openWindow = function(controller, data) {
    var nextWindow = Alloy.createController(controller, data).getView();

    if (OS_IOS) {
        $.navigationIos.openWindow(nextWindow);
    } else {
        nextWindow.open();
    }
};

// Map button
$.mapBtn.addEventListener('click', function() {
    if (userPosition) {
        openWindow('map', {
            title: 'Near stations',
            data: jsonResponse,
            userPosition: userPosition
        });
    }
});

// List event
$.list.addEventListener('itemclick', function(e) {
    var rowData = listItems[e.itemIndex];

    if (userPosition) {
        openWindow('map', {
            title: rowData.station.fields.name,
            data: [rowData.station],
            userPosition: userPosition
        });
    }
});

// Request
var requestApi = function(onCompletion) {
    Ti.Geolocation.getCurrentPosition(function(e) {
        console.log('geoloc', e);
        userPosition = e.coords;

        if (e.coords) {
            var client = Ti.Network.createHTTPClient({
                onload : function(e) {
                    jsonResponse = JSON.parse(this.responseText).records;
                    jsonResponse.forEach(function(station) {
                        listItems.push({
                            title: {
                                text: station.fields.name
                            },
                            location: {
                                text: station.fields.position.join(', ')
                            },
                            station: station
                        });
                    });

                    $.list.sections[0].items = listItems;
                    $.mapBtn.visible = true;

                    if (_.isFunction(onCompletion)) {
                        onCompletion();
                    }
                },
                onerror : function(e) {
                    Ti.API.debug(e.error);
                    alert('error');

                    if (_.isFunction(onCompletion)) {
                        onCompletion();
                    }
                }
            });

            // Prepare the connection.
            client.open("GET", Alloy.CFG.velibApi + '&geofilter.distance='+e.coords.latitude+','+e.coords.longitude+',2000');
            // Send the request.
            client.send();
        }
    });
};


// Refresh control
var refreshControl = Ti.UI.createRefreshControl();
refreshControl.addEventListener('refreshstart', function() {
    requestApi(function() {
        refreshControl.endRefreshing();
    });
});
$.list.refreshControl = refreshControl;

// Open main view
requestApi();
$.navigationIos.open();
