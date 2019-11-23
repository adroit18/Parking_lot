import {VehicleInterface} from './../Vehicle/VehicleInterface';
import {Nullable} from './../Common/interface';

interface SpotInterface {
    getSpotId():Nullable<number>;
    setSpotId(id:number):void;
    isSpotAvailable(): boolean;
    assignVehicle(Vehicle:VehicleInterface):void;
    removeVehicle():void;
    getParkedVehicle():Nullable<VehicleInterface>;
}
interface SpotConstructor {
    new (spotId:Nullable<number>,Vehicle:Nullable<VehicleInterface>): SpotInterface;
}

export {SpotInterface,SpotConstructor}