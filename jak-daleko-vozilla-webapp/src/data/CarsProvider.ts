import { IObjectsResponse, IObject } from "./IObjectsResponse";
import axios from 'axios';
import { Car } from "./Car";

export class CarsProvider {
    private url: string = 'https://api-client-portal.vozilla.pl/map?objectType=VEHICLE';

    public async getCars(): Promise<Car[]> {
        return axios.get(this.url)
            .then(r => {
                const data = r.data as IObjectsResponse;
                return data.objects.map(o => new Car(o));
            })
    }
}