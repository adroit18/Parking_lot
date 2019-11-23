import Vehicle from './../../main/Vehicle/Vehicle';
import { TicketStatus } from '../../main/Ticket/TicketInterface';
import Ticket from '../../main/Ticket/Ticket';

describe("Vehicle Test", () => {
    it("get Vehicle Color", () => {
      const VehicleInstance = new Vehicle("Green","KA-01-HH-1234", null);
      expect(VehicleInstance.getColor()).toBe("Green");
    });
    it("sets Vehicle Color", () => {
        const VehicleInstance = new Vehicle("Green","KA-01-HH-1234", null);
        VehicleInstance.setColor("Red");
        expect(VehicleInstance.getColor()).toBe("Red");
    });
    it("sets Registration Number", () => {
        const VehicleInstance = new Vehicle("Green","KA-01-HH-1234", null);
        VehicleInstance.setRegNum("UU-00-AA-1000");
        expect(VehicleInstance.getRegNum()).toBe("UU-00-AA-1000");
    });
    it("get Registration Number", () => {
        const VehicleInstance = new Vehicle("Green","KA-01-HH-1234", null);
        expect(VehicleInstance.getRegNum()).toBe("KA-01-HH-1234");
    });
    it("get Parking Ticket", () => {
        const VehicleInstance = new Vehicle("Green","KA-01-HH-1234", new Ticket(TicketStatus.ACTIVE));
        const ticket = VehicleInstance.getParkingTicket();
        if(ticket){
            expect(ticket.getTicketStatus()).toBe(TicketStatus.ACTIVE);
        }
    });
    it("get Parking Ticket", () => {
        const VehicleInstance = new Vehicle("Green","KA-01-HH-1234", new Ticket(TicketStatus.ACTIVE));
        const ticketBef = VehicleInstance.getParkingTicket();
        VehicleInstance.assignTicket(new Ticket(TicketStatus.PAID));
        const ticketAft = VehicleInstance.getParkingTicket();
        if(ticketBef){
            expect(ticketBef.getTicketStatus()).toBe(TicketStatus.ACTIVE);
        } 
        if(ticketAft){
            expect(ticketAft.getTicketStatus()).toBe(TicketStatus.PAID);
        }
    });
  });