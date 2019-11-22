import { VehicleInterface } from "./VehicleInterface";
import {Nullable} from './../Common/interface';

class Vehicle implements VehicleInterface{
    private color : Nullable<string>;
    private regNum : Nullable<string>;
    private parkingTicket : Nullable<any>; //Ticket
    
    constructor(color:Nullable<string> = null , 
                regNum:Nullable<string> = null, 
                parkingTicket:Nullable<any> = null/* Ticket*/){
    this.color = color;
    this.regNum = regNum;
    this.parkingTicket = parkingTicket;
    }
    public getColor():Nullable<string>{
        return this.color;
    }
    public setColor(color:string):void{
        this.color = color;
    }
    public getRegNum():Nullable<string>{
        return this.regNum;
    }
    public setRegNum(regId:string):void{
        this.regNum = regId;
    }
    public getParkingTicket():Nullable<any>{
        return this.color;
    }
    public setParkingTicket(parkingTicket:Nullable<any>/* Ticket*/):void{
        this.parkingTicket = parkingTicket;
    }
    public assignTicket(parkingTicket:Nullable<any>/* Ticket*/):void{
        this.setParkingTicket(parkingTicket);
    }
}
export default Vehicle;