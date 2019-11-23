import {Nullable} from './../Common/interface';

enum TicketStatus {
    ACTIVE = "ACTIVE",
    PAID   = "PAID",
    LOST   = "LOST"
}
interface TicketInterface {
    setTicketStatusActive():void
    setTicketStatusPaid():void
    setTicketStatusLost():void
    getTicketStatus():Nullable<TicketStatus>
}
interface TicketConstructor {
    new (ticketStatus:Nullable<TicketStatus>): TicketInterface;
}

export {TicketInterface,TicketConstructor,TicketStatus}