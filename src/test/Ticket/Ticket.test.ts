import { TicketStatus } from '../../main/Ticket/TicketInterface';
import Ticket from '../../main/Ticket/Ticket';

describe("Ticket Test", () => {
    it("get Ticket Status", () => {
      const ticket = new Ticket(TicketStatus.ACTIVE);
      expect(ticket.getTicketStatus()).toBe(TicketStatus.ACTIVE);
    });
    it("set Ticket Status Active", () => {
        const ticket = new Ticket(TicketStatus.ACTIVE);
        ticket.setTicketStatusActive();
        expect(ticket.getTicketStatus()).toBe(TicketStatus.ACTIVE);
    });
    it("set Ticket Status Paid", () => {
        const ticket = new Ticket(TicketStatus.ACTIVE);
        ticket.setTicketStatusPaid();
        expect(ticket.getTicketStatus()).toBe(TicketStatus.PAID);
    });
    it("set Ticket Status Active", () => {
        const ticket = new Ticket(TicketStatus.ACTIVE);
        ticket.setTicketStatusLost();
        expect(ticket.getTicketStatus()).toBe(TicketStatus.LOST);
    });
  });