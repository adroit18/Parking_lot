import {Nullable} from './../Common/interface';

interface VehicleInterface {
    getColor():Nullable<string>;
    setColor(color:string):void;
    getRegNum():Nullable<string>;
    setRegNum(regId:string):void;
    getParkingTicket():Nullable<any>;
    setParkingTicket(parkingTicket:Nullable<any>/* Ticket*/):void;
    assignTicket(parkingTicket:Nullable<any>/* Ticket*/):void;
}
interface VehicleConstructor {
    new (color:string,regNum:string,parkingTicket:any/* Ticket*/): VehicleInterface;
}

export {VehicleInterface,VehicleConstructor}