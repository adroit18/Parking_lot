import { Nullable } from "../Common/interface";
import {SpotInterface} from './../Spot/SpotInterface';
import Spot from "./../Spot/Spot";
import {
    ParkingMapInterface,
    colorToSpotInterface,
    RegToSpotInterface,
    ParkingInterface,
    } from "../Parking/ParkingInterface";

class Parking implements ParkingInterface{
    private name: Nullable<string>;
    private numberOfSpots:number;
    private parkingMap: ParkingMapInterface = {}; //parking id : spots:
    private colorToSpot: colorToSpotInterface = {}; // color : spot
    private regToSpot: RegToSpotInterface = {}; //regNum: spot

    constructor(name:Nullable<string>=null,numberOfSpots:number) {
        this.name = name;
        this.numberOfSpots = numberOfSpots
        this.parkingMap = {}; 
        this.colorToSpot = {};
        this.regToSpot = {};
    }
    public setParkingName(name:string):void{
        this.name = name;
    }
    public getParkingName():Nullable<string>{
        return this.name;
    }
    public getParkingCapacity():number{
        return this.numberOfSpots;
    }
    public getNextAvailableParkingSpot():Nullable<SpotInterface>{
        for(let i = 0; i<this.numberOfSpots;i++){
            if(this.parkingMap[i].isSpotAvailable()){
                return this.parkingMap[i];
            }
        }
        return null;
    }
    public setParkingMap():void{
        for(let i = 0; i<this.numberOfSpots;i+=1){
            this.parkingMap[i] = new Spot(i+1);
        }
    } 
    public getParkingMap():Nullable<ParkingMapInterface>{
        return this.parkingMap;
    }
    public setColorToSpot(key:string,Spot:SpotInterface):void{
        if(this.colorToSpot){
            if(this.colorToSpot[key]){
                this.colorToSpot[key].push(Spot);
            }
            else{
                this.colorToSpot[key] = [Spot];
            }
        }   
    }
    public removeSpotFromColorToSpot(key:string,spotId:number):void{
        if(this.colorToSpot){
            const spots:Array<SpotInterface> = this.colorToSpot[key]
            let toDeleteIndex:Nullable<number> = null;
            if(this.colorToSpot[key]){
                for(let i = 0;i<spots.length;i+=1){
                    if(spots[i].getSpotId() === spotId){
                           toDeleteIndex = i; 
                           break;
                    }
                }
                if(toDeleteIndex){
                    spots.splice(toDeleteIndex, 1);    
                }
            }
        }
    }
    public getColorToSpot(key:string):Array<SpotInterface>{
        if(this.colorToSpot){
            return this.colorToSpot[key] || [];
        }else{
            return [];
        }
    }
    public setRegToSpot(key:string,spot:SpotInterface):void{
        if(this.regToSpot){
            this.regToSpot[key] = spot;
        }   
    }
    public removeSpotFromRegToSpot(key:string):void{
        delete this.regToSpot[key]
    }
    public getRegToSpot(key:string):Nullable<SpotInterface>{
        if(this.regToSpot){
            return this.regToSpot[key];
        }else{
            return null;
        }
    }
}

export default Parking;