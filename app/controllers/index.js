// Init
var listItems = [];

// List event
    $.list.addEventListener('itemclick', function(e) {
    console.log('itemclick', e);
    var rowData = listItems[e.itemIndex];
    var nextWindow = Alloy.createController('secondView', {title: rowData.title.text}).getView();

    if (OS_IOS) {
        $.navigationIos.openWindow(nextWindow);
    } else {
        nextWindow.open();
    }
});

// Request
var client = Ti.Network.createHTTPClient({
    onload : function(e) {
        var jsonResponse = JSON.parse(this.responseText);
        jsonResponse.records.forEach(function(station) {
            listItems.push({
                title: {
                    text: station.fields.name
                },
                location: {
                    text: station.fields.position.join(', ')
                }
            });
        });

        console.log('listItems', listItems);
        $.list.sections[0].items = listItems;
    },
    onerror : function(e) {
        Ti.API.debug(e.error);
        alert('error');
    }
});
// Prepare the connection.
client.open("GET", Alloy.CFG.velibApi);
// Send the request.
client.send();

$.navigationIos.open();
