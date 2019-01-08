import { ILocation } from "selenium-webdriver";

export interface IObjectsResponse {
    objects: IObject[];
}

export interface IObject {
    platesNumber: string;
    rangeKm: number;
    status: string;
    location: IObjectLocation;
    name: string;
    sideNumber: string;
}

export interface IObjectLocation {
    latitude: number;
    longitude: number;
}