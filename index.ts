import ParkingEngine from './src/main/ParkingEngine/ParkingEngine';

try{
    let parkingEngine = new ParkingEngine();
    parkingEngine.startParker();
}catch(e){
    console.log("Uh Oh! An unknown error occured while running, try rebooting the program");
    console.log(e);
}
