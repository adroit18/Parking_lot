import Vehicle from './../../main/Vehicle/Vehicle';
import Parking from '../../main/Parking/Parking';

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
    it("set color to spot map", () => {
        const parking = new Parking("parking Area 1", 6);
        parking.setParkingMap();
        const parkingMap = parking.getParkingMap();
        if(parkingMap){
            let nextSpot = parking.getNextAvailableParkingSpot();
            if(nextSpot){
                const color = "Green";
                const regNum = "KA-01-HH-1236";
                nextSpot.assignVehicle(new Vehicle(color,regNum));
                parking.setColorToSpot(color,nextSpot);
                expect(parking.getColorToSpot(color).length).toBe(1);
            }else{
                throw new Error("set color to spot map failed");
            }
        }
    });
    it("get color to spot map", () => {
        const parking = new Parking("parking Area 1", 6);
        parking.setParkingMap();
        const parkingMap = parking.getParkingMap();
        if(parkingMap){
            let nextSpot = parking.getNextAvailableParkingSpot();
            if(nextSpot){
                const color = "Green";
                const regNum = "KA-01-HH-1236";
                nextSpot.assignVehicle(new Vehicle(color,regNum));
                parking.setColorToSpot(color,nextSpot);
                expect(parking.getColorToSpot(color).length).toBe(1);
            }else{
                throw new Error("get color to spot map failed");
            }
        }
    });
    it("remove from color to spot map", () => {
        const parking = new Parking("parking Area 1", 6);
        parking.setParkingMap();
        const parkingMap = parking.getParkingMap();
        if(parkingMap){
            let nextSpot = parking.getNextAvailableParkingSpot();
            if(nextSpot){
                const color = "Green";
                const regNum = "KA-01-HH-1236";
                nextSpot.assignVehicle(new Vehicle(color,regNum));
                parking.setColorToSpot(color,nextSpot);
                expect(parking.getColorToSpot(color).length).toBe(1);
                nextSpot = parking.getNextAvailableParkingSpot();
                if(nextSpot){
                    const color = "Green";
                    const regNum = "KA-01-HH-1237";
                    nextSpot.assignVehicle(new Vehicle(color,regNum));
                    parking.setColorToSpot(color,nextSpot);
                    expect(parking.getColorToSpot(color).length).toBe(2);
                    const nextSpotId= nextSpot.getSpotId();
                    if(nextSpotId){
                        parking.removeSpotFromColorToSpot(color,nextSpotId);
                    }
                    expect(parking.getColorToSpot(color).length).toBe(1);
                }
            }else{
                throw new Error("remove from color to spot map failed");
            }
        }
    });
    it("set reg to spot map", () => {
        const parking = new Parking("parking Area 1", 6);
        parking.setParkingMap();
        const parkingMap = parking.getParkingMap();
        if(parkingMap){
            let nextSpot = parking.getNextAvailableParkingSpot();
            if(nextSpot){
                const color = "Green";
                const regNum = "KA-01-HH-1236";
                nextSpot.assignVehicle(new Vehicle(color,regNum));
                parking.setRegToSpot(regNum,nextSpot);
                const spotHavingReg = parking.getRegToSpot(regNum);
                if(spotHavingReg){
                    expect(spotHavingReg.getSpotId()).toBe(nextSpot.getSpotId());
                }
            }else{
                throw new Error("get color to spot map failed");
            }
        }
    });
    it("get reg to spot map", () => {
        const parking = new Parking("parking Area 1", 6);
        parking.setParkingMap();
        const parkingMap = parking.getParkingMap();
        if(parkingMap){
            let nextSpot = parking.getNextAvailableParkingSpot();
            if(nextSpot){
                const color = "Green";
                const regNum = "KA-01-HH-1236";
                nextSpot.assignVehicle(new Vehicle(color,regNum));
                parking.setRegToSpot(regNum,nextSpot);
                const spotHavingReg = parking.getRegToSpot(regNum);
                if(spotHavingReg){
                    expect(spotHavingReg.getSpotId()).toBe(nextSpot.getSpotId());
                }
            }else{
                throw new Error("get color to spot map failed");
            }
        }
    });
    it("remove from reg to spot map", () => {
        const parking = new Parking("parking Area 1", 6);
        parking.setParkingMap();
        const parkingMap = parking.getParkingMap();
        if(parkingMap){
            let nextSpot = parking.getNextAvailableParkingSpot();
            if(nextSpot){
                const color = "Green";
                const regNum = "KA-01-HH-1236";
                nextSpot.assignVehicle(new Vehicle(color,regNum));
                parking.setRegToSpot(regNum,nextSpot);
                const spotHavingRegBfr = parking.getRegToSpot(regNum);
                if(spotHavingRegBfr){
                    expect(spotHavingRegBfr.getSpotId()).toBe(nextSpot.getSpotId());
                    parking.removeSpotFromRegToSpot(regNum);
                    const spotHavingRegAft = parking.getRegToSpot(regNum);
                    if(spotHavingRegAft){
                        expect(spotHavingRegAft.getSpotId()).toBe(null);
                    }
                }
            }else{
                throw new Error("get color to spot map failed");
            }
        }
    });
  });