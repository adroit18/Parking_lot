import Vehicle from './../../main/Vehicle/Vehicle';
import { TicketStatus } from '../../main/Ticket/TicketInterface';
import Ticket from '../../main/Ticket/Ticket';
import Parking from '../../main/Parking/Parking';
import Spot from '../../main/Spot/Spot';

describe("Parking Area Test", () => {
    it("get Parking Name", () => {
      const parking = new Parking("parking Area 1", 6);
      expect(parking.getParkingName()).toBe("parking Area 1");
    });
    it("set Parking Name", () => {
        const parking = new Parking("parking Area 1", 6);
        parking.setParkingName("parking area 2");
        expect(parking.getParkingName()).toBe("parking area 2");
    });
    it("get parking capacity", () => {
        const parking = new Parking("parking Area 1", 6);
        expect(parking.getParkingCapacity()).toBe(6);;
    });
    it("get Next Available Slots", () => {
        const parking = new Parking("parking Area 1", 6);
        parking.setParkingMap();
        const parkingMap = parking.getParkingMap();
        if(parkingMap){
            let nextSpot = parking.getNextAvailableParkingSpot();
            if(nextSpot){
                nextSpot.assignVehicle(new Vehicle("Green","KA-01-HH-1236"));
            }else{
                throw new Error("get Next Available Slots failed")
            }
            nextSpot = parking.getNextAvailableParkingSpot();
            if(nextSpot){
                expect(nextSpot.getSpotId()).toBe(2);
            }else{
                throw new Error("get Next Available Slots failed")
            }
        }
    });
    it("set Parking map", () => {
        const parking = new Parking("parking Area 1", 6);
        const parkingMapBef = parking.getParkingMap();
        parking.setParkingMap();
        const parkingMapAft = parking.getParkingMap();
        if(parkingMapAft){
            expect(Object.keys(parkingMapAft).length).toBe(6);
        }else{
            throw new Error('parking map not set');
        }
    });
    it("get Parking Map", () => {
        const parking = new Parking("parking Area 1", 6);
        parking.setParkingMap();
        const parkingMap = parking.getParkingMap();
        if(parkingMap){
            expect(Object.keys(parkingMap).length).toBe(6);
        }else{
            throw new Error('could not get parking map');
        }
    });
  });