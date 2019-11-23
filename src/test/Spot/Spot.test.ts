import Vehicle from './../../main/Vehicle/Vehicle';
import Spot from '../../main/Spot/Spot';

describe("Spots Test", () => {
    it("get Spot Id", () => {
      const spotInstance = new Spot(1, new Vehicle());
      expect(spotInstance.getSpotId()).toBe(1);
    });
    it("set Spot id", () => {
        const spotInstance = new Spot(1, new Vehicle());
        spotInstance.setSpotId(2);
        expect(spotInstance.getSpotId()).toBe(2);
      });
    it("get Parked Vehicle", () => {
        const VehicleInstance = new Vehicle("Green","KA-01-HH-1234", null);
        const spotInstance = new Spot(1, VehicleInstance);
        const vehicle = spotInstance.getParkedVehicle()
        if(vehicle){
            expect(vehicle.getRegNum()).toBe("KA-01-HH-1234");
        }
    });
    it("assign Vehicle", () => {
        const VehicleInstance = new Vehicle("Green","KA-01-HH-1234", null);
        const spotInstance = new Spot(1, VehicleInstance);
        const vehicleBef = spotInstance.getParkedVehicle()
        if(vehicleBef){
            expect(vehicleBef.getRegNum()).toBe("KA-01-HH-1234");
        }
        spotInstance.assignVehicle(new Vehicle("Red","UU-00-AA-1000",null))
        const vehicleAft = spotInstance.getParkedVehicle()
        if(vehicleAft){
            expect(vehicleAft.getRegNum()).toBe("UU-00-AA-1000");
        }
    });
    it("remove Vehicle", () => {
        const VehicleInstance = new Vehicle("Green","KA-01-HH-1234", null);
        const spotInstance = new Spot(1, VehicleInstance);
        expect(spotInstance.isSpotAvailable()).toBe(false);
        spotInstance.removeVehicle();
        expect(spotInstance.isSpotAvailable()).toBe(true);
    });
    it("is Spot Available", () => {
        const VehicleInstance = new Vehicle("Green","KA-01-HH-1234", null);
        const spotInstance = new Spot(1, VehicleInstance);
        expect(spotInstance.isSpotAvailable()).toBe(false);
    });
  });