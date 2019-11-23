import {SpotInterface} from './SpotInterface';
import {VehicleInterface} from './../Vehicle/VehicleInterface';
import {Nullable} from './../Common/interface';

class Spot implements SpotInterface
{ 
	private Vehicle : Nullable<VehicleInterface>; 
    private spotId: Nullable<number>; 
    private isAvailable:boolean;
    constructor(spotId:Nullable<number>=null,Vehicle:Nullable<VehicleInterface>=null){
        this.spotId = spotId
        this.Vehicle = Vehicle;
        this.isAvailable = true;
    }
    public getSpotId():Nullable<number>{
        return this.spotId;
    }
    public setSpotId(id:number):void{
        this.spotId = id;
    }
    public getParkedVehicle():Nullable<VehicleInterface>{
        return this.Vehicle;
    }
    private setParkedVehicle(Vehicle:Nullable<VehicleInterface>):void{
        this.Vehicle = Vehicle;
    }
    public isSpotAvailable():boolean{
        return this.isAvailable;
    }
	public assignVehicle(Vehicle:VehicleInterface):void {
        this.setParkedVehicle(Vehicle);
        this.isAvailable = false;
    } 
	public removeVehicle():void {
        this.setParkedVehicle(null);
        this.isAvailable = true;
    } 
} 

export default Spot;
