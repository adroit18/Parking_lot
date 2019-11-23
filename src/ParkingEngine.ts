import * as readline from 'readline';
import Parking from './main/Parking/Parking';
import { ParkingInterface, ParkingMapInterface } from './main/Parking/ParkingInterface';
import { Nullable } from './main/Common/interface';
import Ticket from './main/Ticket/Ticket';
import { TicketStatus, TicketInterface } from './main/Ticket/TicketInterface';
import { VehicleInterface } from './main/Vehicle/VehicleInterface';
import Vehicle from './main/Vehicle/Vehicle';
import { SpotInterface } from './main/Spot/SpotInterface';
class ParkingEngine {
    private interactiveBot:any;
    private commandTokeniser:string = " ";
    private parkingArea:Nullable<ParkingInterface>= null;
    constructor(){
        this.interactiveBot = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    public startParker(){
        this.interactiveBot.question('', (answer:string)=>this.processCommands(answer))
    }
    public closeParker(){
        this.interactiveBot.close();
    }
    public processCommands(command:string):void{
        const tokeniseCommand:string[] = command.split(this.commandTokeniser);
        const step:string = tokeniseCommand[0];
        if(step === "create_parking_lot" || step === "c"){
            const numberofSlots:number = Number(tokeniseCommand[1]);
            this.parkingArea = new Parking(null ,numberofSlots);
            this.parkingArea.setParkingMap();
             console.log(`Created a parking lot with ${numberofSlots} slots`)
        }else if(step === "park" || step === "p"){
            const regNum:string = tokeniseCommand[1];
            const color:string = tokeniseCommand[2];
            let ticket:TicketInterface = new Ticket(TicketStatus.ACTIVE);
            let vehicle:VehicleInterface = new Vehicle(color,regNum,ticket);
            if(this.parkingArea){
                const spot:Nullable<SpotInterface> = this.parkingArea.getNextAvailableParkingSpot();
                if(spot && spot.isSpotAvailable()){
                    spot.assignVehicle(vehicle);
                    console.log(`Allocated slot number: ${spot.getSpotId()}`)
                }else{
                    console.log("Sorry, parking lot is full");
                }
            }else{
                console.log("Please initialise a parking area first");
            }
        }else if(step === "leave" || step === "l"){
            const spotNumberToEmpty:number = Number(tokeniseCommand[1]);
            if(this.parkingArea){
                const currentParkingMap:Nullable<ParkingMapInterface> = this.parkingArea.getParkingMap()
                if(currentParkingMap){
                    const spot:SpotInterface = currentParkingMap[spotNumberToEmpty-1];
                    spot.removeVehicle();
                    console.log(`Slot number ${spotNumberToEmpty} is free`);
                }else{
                    console.log("Parking Map not initialised");
                }
            }else{
                console.log("Please initialise a parking area first");
            }
        }else if(step === "status" || step === "s"){
            if(this.parkingArea){
                const currentParkingMap:Nullable<ParkingMapInterface> = this.parkingArea.getParkingMap();
                const numberOfSlots:number = this.parkingArea.getParkingCapacity();
                if(currentParkingMap){
                    console.log(`Slot No.\tRegistration No.\tColour\t`);
                    for(let i = 0;i<numberOfSlots;i++){
                        const parkedVehicle:Nullable<VehicleInterface> = currentParkingMap[i].getParkedVehicle();
                        let status = `${currentParkingMap[i].getSpotId()}\t\tNA\t\t\tNA\t`;
                        if(parkedVehicle){
                            status = `${currentParkingMap[i].getSpotId()}\t\t${parkedVehicle.getRegNum()}\t\t\t${parkedVehicle.getColor()}\t`;
                        }
                        console.log(status);
                    }
                }else{
                    console.log("Parking Map not initialised");
                }
            }else{
                console.log("Please initialise a parking area first");
            }
        }else if(step === "registration_numbers_for_cars_with_colour" || step === "rc"){
            if(this.parkingArea){
                
            }else{
                console.log("Please initialise a parking area first");
            }
        }else if(step === "slot_numbers_for_cars_with_colour"){

        }else if(step === "slot_number_for_registration_number"){

        }else if(step === "exit"){
            this.closeParker();
            return;
        } 
        this.startParker();
    }
}
export default ParkingEngine;