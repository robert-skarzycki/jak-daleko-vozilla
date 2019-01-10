const axios = require('axios');
const {
    GeoCoordinate
} = require('geocoordinate');

const homeLat = Number.parseFloat(process.env.RS_HOME_LAT);
const homeLon = Number.parseFloat(process.env.RS_HOME_LON);
const distanceApiKey = process.env.RS_GRAPHHOPPER_KEY;

const Vehicle = function (vehicleObject) {
    var self = this;

    const distanceApiUrl = `https://graphhopper.com/api/1/route?point=${homeLat},${homeLon}&point=${vehicleObject.location.latitude},${vehicleObject.location.longitude}&vehicle=foot&locale=pl&key=${distanceApiKey}`;

    return axios.get(distanceApiUrl).then(result => {
        const data = result.data;
        const distance = data.paths[0].distance;
        return {
            status: vehicleObject.status,
            sideNumber: vehicleObject.sideNumber,
            platesNumber: vehicleObject.platesNumber,
            rangeKm: vehicleObject.rangeKm,
            distance: distance
        };
    });
};

const VehicleFinder = function () {
    const self = this;

    const VozillaApiUrl = 'https://api-client-portal.vozilla.pl/map?objectType=VEHICLE';

    const findNearest = function () {
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
                        nearestVehicles: vehicles.sort(v => v.distance)
                    };
                });
            })
    };

    return {
        findNearest: findNearest
    };
}

module.exports = new VehicleFinder();