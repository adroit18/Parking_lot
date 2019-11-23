import {SpotInterface} from './../Spot/SpotInterface';
import { Nullable } from '../Common/interface';

interface ParkingMapInterface {
    [key: string] : SpotInterface;
}
interface colorToSpotInterface {
    [key: string] : Array<SpotInterface>;
}
interface RegToSpotInterface {
    [key: string] : SpotInterface;
}

interface ParkingInterface {
    setParkingName(name:string): void;
    getParkingName():Nullable<string>;
    getNextAvailableParkingSpot():Nullable<SpotInterface>;
    setParkingMap():void;
    getParkingMap():Nullable<ParkingMapInterface>;
    setColorToSpot(key:string,Spot:SpotInterface):void;
    getColorToSpot(key:string):Array<SpotInterface>
    removeSpotFromColorToSpot(key:string,spotId:number):void
    setRegToSpot(key:string,spot:SpotInterface):void
    removeSpotFromRegToSpot(key:string):void;
    getRegToSpot(key:string):Nullable<SpotInterface>
    getParkingCapacity():number;
}
interface ParkingConstructor {
    new (name:Nullable<string>): ParkingInterface;
}
export  {
    ParkingMapInterface,
    colorToSpotInterface,
    RegToSpotInterface,
    ParkingInterface,
    ParkingConstructor
}