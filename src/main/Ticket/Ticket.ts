import {TicketInterface, TicketStatus} from './TicketInterface';
import {Nullable} from './../Common/interface';
class Ticket implements TicketInterface{
    private ticketStatus:Nullable<TicketStatus>;
    constructor(ticketStatus:Nullable<TicketStatus>=null){
        this.ticketStatus = ticketStatus;
    }
    public setTicketStatusActive():void{
        this.ticketStatus = TicketStatus.ACTIVE;
    }
    public setTicketStatusPaid():void{
        this.ticketStatus = TicketStatus.PAID;
    }
    public setTicketStatusLost():void{
        this.ticketStatus = TicketStatus.LOST;
    }
    public getTicketStatus():Nullable<TicketStatus>{
        return this.ticketStatus;
    }
}
export default Ticket;