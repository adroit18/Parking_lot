import {Nullable} from './../Common/interface';
import {TicketInterface} from './../Ticket/TicketInterface'
interface VehicleInterface {
    getColor():Nullable<string>;
    setColor(color:string):void;
    getRegNum():Nullable<string>;
    setRegNum(regId:string):void;
    getParkingTicket():Nullable<TicketInterface>;
    assignTicket(parkingTicket:Nullable<TicketInterface>):void;
}
interface VehicleConstructor {
    new (color:string,regNum:string,parkingTicket:TicketInterface): VehicleInterface;
}

export {VehicleInterface,VehicleConstructor}