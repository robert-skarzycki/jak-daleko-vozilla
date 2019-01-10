const axios = require('axios');
const {
    GeoCoordinate
} = require('geocoordinate');

const Vehicle = function (vehicleObject) {
    var self = this;

    return Promise.resolve({
        status: vehicleObject.status,
        sideNumber: vehicleObject.sideNumber,
        platesNumber: vehicleObject.platesNumber,
        rangeKm: vehicleObject.rangeKm
    });
};

const VehicleFinder = function () {
    const self = this;

    const VozillaApiUrl = 'https://api-client-portal.vozilla.pl/map?objectType=VEHICLE';

    const findNearest = function () {
        const homeLat = Number.parseFloat(process.env.RS_HOME_LAT);
        const homeLon = Number.parseFloat(process.env.RS_HOME_LON);

        const home = new GeoCoordinate([homeLat, homeLon]);

        return axios.get(VozillaApiUrl)
            .then(result => {
                const data = result.data;
                const vehiclesInArea = data.objects.filter(v => {
                    const vehicleLocation = new GeoCoordinate([v.location.latitude, v.location.longitude]);
                    return home.distanceTo(vehicleLocation) < 1500;
                });

                return Promise.all(vehiclesInArea.map(v => new Vehicle(v))).then(vehicles => {
                    return {
                        nearestVehicles: vehicles
                    };
                });
            })
    };

    return {
        findNearest: findNearest
    };
}

module.exports = new VehicleFinder();