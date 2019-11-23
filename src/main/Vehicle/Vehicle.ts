import { VehicleInterface } from "./VehicleInterface";
import {Nullable} from './../Common/interface';
import {TicketInterface} from './../Ticket/TicketInterface'
class Vehicle implements VehicleInterface{
    private color : Nullable<string>;
    private regNum : Nullable<string>;
    private parkingTicket : Nullable<TicketInterface>;
    
    constructor(color:Nullable<string> = null , 
                regNum:Nullable<string> = null, 
                parkingTicket:Nullable<TicketInterface> = null){
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
    public getParkingTicket():Nullable<TicketInterface>{
        return this.parkingTicket;
    }
    private setParkingTicket(parkingTicket:Nullable<TicketInterface>):void{
        this.parkingTicket = parkingTicket;
    }
    public assignTicket(parkingTicket:Nullable<TicketInterface>):void{
        this.setParkingTicket(parkingTicket);
    }
}
export default Vehicle;