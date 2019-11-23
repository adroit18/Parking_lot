import { Nullable } from "../Common/interface";
import {SpotInterface} from './../Spot/SpotInterface';
import { VehicleInterface } from "../Vehicle/VehicleInterface";
import {
    ParkingMapInterface,
    ColorToRegInterface,
    RegToSpotInterface,
    ParkingInterface,
    } from "../Parking/ParkingInterface";

class Parking implements ParkingInterface{
    private name: Nullable<string>;
    private numberOfSpots:Nullable<number>;
    private parkingMap: Nullable<ParkingMapInterface>;
    private colorToReg: Nullable<ColorToRegInterface>;
    private regToSpot: Nullable<RegToSpotInterface>;

    constructor(name:Nullable<string>=null,numberOfSpots:Nullable<number>=null) {
        this.name = name;
        this.numberOfSpots = numberOfSpots
        this.parkingMap = {}; 
        this.colorToReg = {};
        this.regToSpot = {};
    }
    public setParkingName(name:string):void{
        this.name = name;
    }
    public getParkingName():Nullable<string>{
        return this.name;
    }
    public setParkingSpots(numberOfSpots:Nullable<number>):void{
        this.numberOfSpots = numberOfSpots;
    }
    public getParkingSpots():Nullable<number>{
        return this.numberOfSpots;
    }
    public setParkingMap(parkingMap:Nullable<ParkingMapInterface>={}):void{
        this.parkingMap = parkingMap;
    }
    public getParkingMap():Nullable<ParkingMapInterface>{
        return this.parkingMap;
    }
    public setColorToReg(key:string,Vehicle:VehicleInterface):void{
        if(this.colorToReg){
            if(this.colorToReg[key]){
                this.colorToReg[key].push(Vehicle);
            }
            else{
                this.colorToReg[key] = [Vehicle];
            }
        }   
    }
    public getColorToReg(key:string):Array<VehicleInterface>{
        if(this.colorToReg){
            return this.colorToReg[key];
        }else{
            return [];
        }
    }
    public setRegToSpot(key:string,spot:SpotInterface):void{
        if(this.regToSpot){
            if(this.regToSpot[key]){
                this.regToSpot[key].push(spot);
            }
            else{
                this.regToSpot[key] = [spot];
            }
        }   
    }
    public getRegToSpot(key:string):Array<SpotInterface>{
        if(this.regToSpot){
            return this.regToSpot[key];
        }else{
            return [];
        }
    }
}