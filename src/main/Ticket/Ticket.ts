import {TicketInterface, TicketStatus} from './TicketInterface';
import {Nullable} from './../Common/interface';
class Ticket implements TicketInterface{
    private ticketStatus:Nullable<TicketStatus>;
    constructor(ticketStatus:Nullable<TicketStatus>=null){
        this.ticketStatus = ticketStatus;
    }
    setTicketStatusActive(ticketStatus:TicketStatus):void{
        this.ticketStatus = TicketStatus.ACTIVE;
    }
    setTicketStatusPaid(ticketStatus:TicketStatus):void{
        this.ticketStatus = TicketStatus.PAID;
    }
    setTicketStatusLost(ticketStatus:TicketStatus):void{
        this.ticketStatus = TicketStatus.LOST;
    }
    getTicketStatus():Nullable<TicketStatus>{
        return this.ticketStatus;
    }
}
export default Ticket;