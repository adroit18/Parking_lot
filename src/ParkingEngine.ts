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
    public createParkingArea(tokeniseCommand:string[]){
        const numberofSlots:number = Number(tokeniseCommand[1]);
        this.parkingArea = new Parking(null ,numberofSlots);
        this.parkingArea.setParkingMap();
        console.log(`Created a parking lot with ${numberofSlots} slots`)
    }
    public proceedParkingProcess(tokeniseCommand:string[]){
        const regNum:string = tokeniseCommand[1];
        const color:string = tokeniseCommand[2];
        let ticket:TicketInterface = new Ticket(TicketStatus.ACTIVE);
        let vehicle:VehicleInterface = new Vehicle(color,regNum,ticket);
        if(this.parkingArea){
            const spot:Nullable<SpotInterface> = this.parkingArea.getNextAvailableParkingSpot();
            if(spot && spot.isSpotAvailable()){
                spot.assignVehicle(vehicle);
                this.parkingArea.setColorToSpot(color,spot);
                this.parkingArea.setRegToSpot(regNum,spot);
                console.log(`Allocated slot number: ${spot.getSpotId()}`)
            }else{
                console.log("Sorry, parking lot is full");
            }
        }else{
            console.log("Please initialise a parking area first");
        }
   }
   public proceedExitProcess(tokeniseCommand:string[]){
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
    }
    public getStatusOfParkingArea(tokeniseCommand:string[]){
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
    }
    public getRegNumFromColor(tokeniseCommand:string[]){
        const colorQuery:string = tokeniseCommand[1];
            if(this.parkingArea){
                let regNumsForColor = [];
                const colorWiseInfo:Array<SpotInterface> = this.parkingArea.getColorToSpot(colorQuery);
                for(let i = 0;i<colorWiseInfo.length;i+=1){
                    const vehicle:Nullable<VehicleInterface> = colorWiseInfo[i].getParkedVehicle();
                   if(vehicle){
                      regNumsForColor.push(vehicle.getRegNum());
                  }
            }
            console.log(regNumsForColor.join(","))
        }else{
            console.log("Please initialise a parking area first");
        }
    }
    public getSlotNumsFromColor(tokeniseCommand:string[]){
        const colorQuery:string = tokeniseCommand[1];
            if(this.parkingArea){
                let slotNumbersForColor = [];
                const colorWiseInfo:Array<SpotInterface> = this.parkingArea.getColorToSpot(colorQuery);
                for(let i = 0;i<colorWiseInfo.length;i+=1){
                    const spotId:Nullable<number> = colorWiseInfo[i].getSpotId();
                    if(spotId){
                        slotNumbersForColor.push(spotId);
                }
            }
            console.log(slotNumbersForColor.join(","))
        }else{
            console.log("Please initialise a parking area first");
        }
    }
    public getSlotNumFromRegNum(tokeniseCommand:string[]){
        const regNumQuery:string = tokeniseCommand[1];
        if(this.parkingArea){
            const regNumWiseInfo:Nullable<SpotInterface> = this.parkingArea.getRegToSpot(regNumQuery);
            if(regNumWiseInfo){
                console.log(regNumWiseInfo.getSpotId());
            }else{
                console.log("Not Found");
            }
        }else{
            console.log("Please initialise a parking area first");
        }   
    }
    public processCommands(command:string):void{
        const tokeniseCommand:string[] = command.split(this.commandTokeniser);
        const step:string = tokeniseCommand[0];
        if(step === "create_parking_lot" || step === "c"){
            this.createParkingArea(tokeniseCommand);
        }else if(step === "park" || step === "p"){
            this.proceedParkingProcess(tokeniseCommand);
        }else if(step === "leave" || step === "l"){
            this.proceedExitProcess(tokeniseCommand);
        }else if(step === "status" || step === "s"){
           this.getStatusOfParkingArea(tokeniseCommand);
        }else if(step === "registration_numbers_for_cars_with_colour" || step === "rc"){
            this.getRegNumFromColor(tokeniseCommand);
        }else if(step === "slot_numbers_for_cars_with_colour" || step === "rs"){
            this.getSlotNumsFromColor(tokeniseCommand);
        }else if(step === "slot_number_for_registration_number" || step === "rn"){
            this.getSlotNumFromRegNum(tokeniseCommand); 
        }else if(step === "exit"){
            this.closeParker();
            return;
        } 
        this.startParker();
    }
}
export default ParkingEngine;