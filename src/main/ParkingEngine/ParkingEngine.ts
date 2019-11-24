import * as readline from 'readline';
import Parking from '../Parking/Parking';
import { ParkingInterface, ParkingMapInterface } from '../Parking/ParkingInterface';
import { Nullable } from '../Common/interface';
import Ticket from '../Ticket/Ticket';
import { TicketStatus, TicketInterface } from '../Ticket/TicketInterface';
import { VehicleInterface } from '../Vehicle/VehicleInterface';
import Vehicle from '../Vehicle/Vehicle';
import { SpotInterface } from '../Spot/SpotInterface';
import { PARKING_ENGINE_COMMANDS } from '../../utils';
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
    private logOutput(logThis:string):void{
        console.log(logThis);
    }
    public startParker():void{
        this.interactiveBot.question('', (answer:string)=>this.startParkingBot(answer))
    }
    private closeParker():void{
        this.interactiveBot.close();
    }
    private createParkingArea(tokeniseCommand:string[]):void{
        const numberofSlots:number = Number(tokeniseCommand[1]);
        if(numberofSlots>0){
            this.parkingArea = new Parking(null ,numberofSlots);
            this.parkingArea.setParkingMap();
            this.logOutput(`Created a parking lot with ${numberofSlots} slots`)
        }else{
            this.logOutput(`Please enter number greater than zero`);
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
                const isVehicleDuplication = this.parkingArea.getRegToSpot(regNum);
                if(isVehicleDuplication){
                    this.logOutput(`Vehicle with ${regNum} already exists in parking`);
                    return;
                }else{
                    spot.assignVehicle(vehicle);
                    this.parkingArea.setColorToSpot(color,spot);
                    this.parkingArea.setRegToSpot(regNum,spot);
                    this.logOutput(`Allocated slot number: ${spot.getSpotId()}`)
                }
            }else{
                this.logOutput("Sorry, parking lot is full");
            }
        }else{
            this.logOutput("Please initialise a parking area first");
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
                    const ticket:Nullable<TicketInterface> = parkedVehicleInfo.getParkingTicket();
                    if(ticket){
                        ticket.setTicketStatusPaid();
                    }
                    if(regNum){
                        this.parkingArea.removeSpotFromRegToSpot(regNum)
                    }
                    if(color && spotId){
                        this.parkingArea.removeSpotFromColorToSpot(color,spotId);
                    }
                }
                spot.removeVehicle();
                this.logOutput(`Slot number ${spotNumberToEmpty} is free`);
            }else{
                this.logOutput("Parking Map not initialised");
            }
        }else{
            this.logOutput("Please initialise a parking area first");
        }
    }
    private getStatusOfParkingArea(tokeniseCommand:string[]):void{
        if(this.parkingArea){
            const currentParkingMap:Nullable<ParkingMapInterface> = this.parkingArea.getParkingMap();
            const numberOfSlots:number = this.parkingArea.getParkingCapacity();
            if(currentParkingMap){
                this.logOutput(`Slot No.    Registration No    Colour`);
                for(let i = 0;i<numberOfSlots;i++){
                    const parkedVehicle:Nullable<VehicleInterface> = currentParkingMap[i].getParkedVehicle();
                    if(parkedVehicle){
                        let regNum = parkedVehicle.getRegNum();
                        let color  = parkedVehicle.getColor();
                        if(regNum && color){
                           this.logOutput(`${currentParkingMap[i].getSpotId()}           ${regNum}      ${color}`);
                        }
                    }
                }
            }else{
                this.logOutput("Parking Map not initialised");
            }
        }else{
            this.logOutput("Please initialise a parking area first");
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
            this.logOutput(regNumsForColor.join(", "))
        }else{
            this.logOutput("Please initialise a parking area first");
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
            this.logOutput(slotNumbersForColor.join(", "))
        }else{
            this.logOutput("Please initialise a parking area first");
        }
    }
    private getSlotNumFromRegNum(tokeniseCommand:string[]):void{
        const regNumQuery:string = tokeniseCommand[1];
        if(this.parkingArea){
            const regNumWiseInfo:Nullable<SpotInterface> = this.parkingArea.getRegToSpot(regNumQuery);
            if(regNumWiseInfo){
                this.logOutput(`${regNumWiseInfo.getSpotId()}`);
            }else{
                this.logOutput("Not found");
            }
        }else{
            this.logOutput("Please initialise a parking area first");
        }   
    }
    private startParkingBot(command:string):void{
        const tokeniseCommand:string[] = command.split(this.commandTokeniser);
        const step:string = tokeniseCommand[0];
        switch (step){
            case PARKING_ENGINE_COMMANDS.CREATE_PARKING_LOT:
                this.createParkingArea(tokeniseCommand);
                break;
            case PARKING_ENGINE_COMMANDS.PARK:
                this.proceedParkingProcess(tokeniseCommand);
                break;
            case PARKING_ENGINE_COMMANDS.LEAVE:
                this.proceedExitProcess(tokeniseCommand);
                break;
            case PARKING_ENGINE_COMMANDS.STATUS:
                this.getStatusOfParkingArea(tokeniseCommand);
                break;
            case PARKING_ENGINE_COMMANDS.REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR:
                this.getRegNumFromColor(tokeniseCommand);
                break;
            case PARKING_ENGINE_COMMANDS.SLOT_NUMBERS_FOR_CARS_WITH_COLOUR:
                this.getSlotNumsFromColor(tokeniseCommand);
                break;
            case PARKING_ENGINE_COMMANDS.SLOT_NUMBER_FOR_REGISTRATION_NUMBER:
                this.getSlotNumFromRegNum(tokeniseCommand); 
                break;
            case PARKING_ENGINE_COMMANDS.EXIT:
                this.closeParker();
                process.exit();
                break;
            default:
                this.logOutput("Please Enter a valid command");
        }
        this.startParker();
    }
}
export default ParkingEngine;