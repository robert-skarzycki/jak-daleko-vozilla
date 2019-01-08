import { Location } from './Location';
import { Car } from './Car';
import { DistanceCalculator } from './DistanceCalculator';

export class Home {
    private distanceCalculator: DistanceCalculator = new DistanceCalculator();

    constructor(private location: Location, private topLeft: Location, private bottomRight: Location) {
    }

    public async pickNearestCar(cars: Car[]): Promise<Car[]> {
        const carsInBoundingBox = cars.filter(c => c.location.isInBoundingBox(this.topLeft, this.bottomRight));

        if (carsInBoundingBox.length == 0) {
            return [];
        }

        const promises = carsInBoundingBox.map(c => {
            return this.distanceCalculator.getDistance(this.location, c.location)
                .then(distance => {
                    c.distance = distance;
                });
        });

        return Promise.all(promises)
            .then(() => carsInBoundingBox.sort((c1, c2) => c1 > c2 ? 1 : -1));
    }
}