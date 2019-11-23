import {SpotInterface} from './../Spot/SpotInterface';
import { VehicleInterface } from "../Vehicle/VehicleInterface";
import { Nullable } from '../Common/interface';

interface ParkingMapInterface {
    [key: string] : string;
}
interface ColorToRegInterface {
    [key: string] : Array<VehicleInterface>;
}
interface RegToSpotInterface {
    [key: string] : Array<SpotInterface>;
}

interface ParkingInterface {
    setParkingName(name:string): void;
    getParkingName():Nullable<string>;
    setParkingMap(parkingMap:Nullable<ParkingMapInterface>):void;
    getParkingMap():Nullable<ParkingMapInterface>;
    setColorToReg(key:string,Vehicle:VehicleInterface):void;
    getColorToReg(key:string):Array<VehicleInterface>
    setRegToSpot(key:string,spot:SpotInterface):void
    getRegToSpot(key:string):Array<SpotInterface>
}
interface ParkingConstructor {
    new (name:Nullable<string>): ParkingInterface;
}
export  {
    ParkingMapInterface,
    ColorToRegInterface,
    RegToSpotInterface,
    ParkingInterface,
    ParkingConstructor
}