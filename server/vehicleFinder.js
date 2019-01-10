const axios = require('axios');
const {
    GeoCoordinate,
    BoundingBox
} = require('geocoordinate');

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

                return {
                    nearestVehicles: vehiclesInArea
                };
            })
    };

    return {
        findNearest: findNearest
    };
}

module.exports = new VehicleFinder();