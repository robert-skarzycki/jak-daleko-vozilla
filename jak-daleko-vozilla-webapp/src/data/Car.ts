import { IObject } from "./IObjectsResponse";
import { CarStatus } from "./CarStatus";
import { Location } from './Location';

export class Car {
    public status: CarStatus;
    public rangeKm: number;
    public platesNumber: string;
    public sideNumber: string;
    public location: Location;
    public distance: number;


    constructor(object: IObject) {
        this.rangeKm = object.rangeKm;
        this.platesNumber = object.platesNumber;
        this.sideNumber = object.sideNumber;
        this.location = new Location(object.location);
        this.status = this.getStatus(object.status);
    }

    private getStatus(status: string) {
        if (status === 'AVAILABLE') {
            return CarStatus.Available;
        }
        else if (status === 'RESERVED') {
            return CarStatus.Reserved;
        }
        else {
            return CarStatus.None;
        }
    }
}