import {VehicleInterface} from './../Vehicle/VehicleInterface';
import {Nullable} from './../Common/interface';

interface SpotInterface {
    isSpotAvailable(): boolean;
    assignVehicle(Vehicle:VehicleInterface):void;
    removeVehicle():void;
}
interface SpotConstructor {
    new (spotId:Nullable<number>,Vehicle:Nullable<VehicleInterface>): SpotInterface;
}

export {SpotInterface,SpotConstructor}