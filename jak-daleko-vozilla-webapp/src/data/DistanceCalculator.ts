import { Location } from './Location';
import axios from 'axios';

export class DistanceCalculator {

    public async getDistance(from: Location, to: Location): Promise<number> {
        const fromLatitude = from.latitude;
        const fromLongitude = from.longitude;
        const toLatitude = to.latitude;
        const toLongtitude = to.longitude;
        const apiKey = process.env.RS_GRAPHHOPPER_VOZILLA_KEY;

        const url = `https://graphhopper.com/api/1/route?point=${fromLatitude},${fromLongitude}&point=${toLatitude},${toLongtitude}&vehicle=foot&locale=pl&key=${apiKey}`
        return axios.get(url).then(r => r.data.paths.distance);

    }
}