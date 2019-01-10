$(
    function () {
        const $container = $('div[nearest-vehicles-container]');
        $.getJSON('/api/nearest').then(function (data) {
            var html = '';
            for (var i = 0; i < data.nearestVehicles.length; i++) {
                var vehicle = data.nearestVehicles[i];
                html += '<p><b>' + vehicle.distance + ' metrów</b>' + vehicle.sideNumber + ' ' + vehicle.platesNumber + ' ' + vehicle.rangeKm + ' km ' + vehicle.status + '</p>';
            }

            $container.html(html);
        });
    }
);