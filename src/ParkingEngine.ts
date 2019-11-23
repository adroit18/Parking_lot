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
            output: process.stdout,
            terminal: false
        });
    }
    public startParker():void{
        // console.log(process.argv);
        this.interactiveBot.question('', (answer:string)=>this.processCommands(answer))
    }
    private closeParker():void{
        this.interactiveBot.close();
    }
    private createParkingArea(tokeniseCommand:string[]):void{
        const numberofSlots:number = Number(tokeniseCommand[1]);
        if(numberofSlots>0){
            this.parkingArea = new Parking(null ,numberofSlots);
            this.parkingArea.setParkingMap();
            console.log(`Created a parking lot with ${numberofSlots} slots`)
        }else{
            console.log(`Please enter number greater than zero`);
        }
    }
    private proceedParkingProcess(tokeniseCommand:string[]):void{
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
   private proceedExitProcess(tokeniseCommand:string[]):void{
        const spotNumberToEmpty:number = Number(tokeniseCommand[1]);
        if(this.parkingArea){
            const currentParkingMap:Nullable<ParkingMapInterface> = this.parkingArea.getParkingMap()
            if(currentParkingMap){
                const spot:SpotInterface = currentParkingMap[spotNumberToEmpty-1];
                const parkedVehicleInfo:Nullable<VehicleInterface> = spot.getParkedVehicle();
                if(parkedVehicleInfo){
                    const regNum:Nullable<string> = parkedVehicleInfo.getRegNum();
                    const color:Nullable<string> = parkedVehicleInfo.getColor();
                    const spotId:Nullable<number> = spot.getSpotId();
                    if(regNum){
                        this.parkingArea.removeSpotFromRegToSpot(regNum)
                    }
                    if(color && spotId){
                        this.parkingArea.removeSpotFromColorToSpot(color,spotId);
                    }
                }
                spot.removeVehicle();
                console.log(`Slot number ${spotNumberToEmpty} is free`);
            }else{
                console.log("Parking Map not initialised");
            }
        }else{
            console.log("Please initialise a parking area first");
        }
    }
    private getStatusOfParkingArea(tokeniseCommand:string[]):void{
        if(this.parkingArea){
            const currentParkingMap:Nullable<ParkingMapInterface> = this.parkingArea.getParkingMap();
            const numberOfSlots:number = this.parkingArea.getParkingCapacity();
            if(currentParkingMap){
                console.log(`Slot No.    Registration No    Colour`);
                for(let i = 0;i<numberOfSlots;i++){
                    const parkedVehicle:Nullable<VehicleInterface> = currentParkingMap[i].getParkedVehicle();
                    if(parkedVehicle){
                        let regNum = parkedVehicle.getRegNum();
                        let color  = parkedVehicle.getColor();
                        if(regNum && color){
                           console.log(`${currentParkingMap[i].getSpotId()}           ${regNum}      ${color}`);
                        }
                    }
                }
            }else{
                console.log("Parking Map not initialised");
            }
        }else{
            console.log("Please initialise a parking area first");
        }
    }
    private getRegNumFromColor(tokeniseCommand:string[]):void{
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
            console.log(regNumsForColor.join(", "))
        }else{
            console.log("Please initialise a parking area first");
        }
    }
    private getSlotNumsFromColor(tokeniseCommand:string[]):void{
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
            console.log(slotNumbersForColor.join(", "))
        }else{
            console.log("Please initialise a parking area first");
        }
    }
    private getSlotNumFromRegNum(tokeniseCommand:string[]):void{
        const regNumQuery:string = tokeniseCommand[1];
        if(this.parkingArea){
            const regNumWiseInfo:Nullable<SpotInterface> = this.parkingArea.getRegToSpot(regNumQuery);
            if(regNumWiseInfo){
                console.log(`${regNumWiseInfo.getSpotId()}`);
            }else{
                console.log("Not found");
            }
        }else{
            console.log("Please initialise a parking area first");
        }   
    }
    private processCommands(command:string):void{
        // console.log('command',"welcome man/women****************************");
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