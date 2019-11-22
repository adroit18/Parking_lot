import {Nullable} from './../Common/interface';

enum TicketStatus {
    ACTIVE = "ACTIVE",
    PAID   = "PAID",
    LOST   = "LOST"
}
interface TicketInterface {
    setTicketStatusActive(ticketStatus:TicketStatus):void
    setTicketStatusPaid(ticketStatus:TicketStatus):void
    setTicketStatusLost(ticketStatus:TicketStatus):void
    getTicketStatus():Nullable<TicketStatus>
}
interface TicketConstructor {
    new (ticketStatus:Nullable<TicketStatus>): TicketInterface;
}

export {TicketInterface,TicketConstructor,TicketStatus}