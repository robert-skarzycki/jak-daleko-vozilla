import { IObjectLocation } from "./IObjectsResponse";

export class Location {
    public latitude: number;
    public longitude: number;

    constructor(objectLocation: IObjectLocation) {
        this.latitude = objectLocation.latitude;
        this.longitude = objectLocation.longitude;
    }

    public isInBoundingBox(topLeft: Location, bottomRight: Location): boolean {
        return this.latitude >= topLeft.latitude &&
            this.longitude >= topLeft.longitude &&
            this.latitude <= bottomRight.latitude &&
            this.longitude <= bottomRight.longitude;
    }
}